from fastapi import FastAPI, APIRouter, HTTPException, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List
import uuid
from datetime import datetime, timezone
import smtplib
import ssl
from email.message import EmailMessage
import requests


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactMessage(BaseModel):
    # Cap inputs to prevent abuse
    name: str = Field(min_length=1, max_length=80)
    email: EmailStr = Field(max_length=254)
    message: str = Field(min_length=1, max_length=2000)
    website: str | None = None  # honeypot field

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.get("/health")
async def health():
    return {"status": "OK"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Simple in-memory rate limiting per IP
RATE_LIMIT_WINDOW_SECONDS = 60
RATE_LIMIT_MAX_REQUESTS = 3
rate_limit_state: dict[str, dict[str, float | int]] = {}


@api_router.post("/contact")
async def send_contact_message(payload: ContactMessage, request: Request):
    """Accepts contact form submission and sends an email via SMTP."""
    smtp_host = os.environ.get('SMTP_HOST')
    smtp_port = int(os.environ.get('SMTP_PORT', '587'))
    smtp_user = os.environ.get('SMTP_USER')
    smtp_pass = os.environ.get('SMTP_PASS')
    to_email = os.environ.get('TO_EMAIL')
    from_email = os.environ.get('FROM_EMAIL') or smtp_user
    use_ssl = os.environ.get('SMTP_USE_SSL', 'false').lower() == 'true'
    api_token = os.environ.get('MAILTRAP_API_TOKEN')

    if not (smtp_host and smtp_user and smtp_pass and to_email):
        raise HTTPException(status_code=500, detail="Email service not configured")

    # Honeypot: if hidden field is filled, treat as bot
    if payload.website and payload.website.strip():
        raise HTTPException(status_code=400, detail="Invalid submission")

    # Additional server-side caps and normalization
    name = payload.name.strip()
    msg_text = payload.message.strip()
    email_str = str(payload.email).strip()

    if len(name) > 80 or len(email_str) > 254 or len(msg_text) > 2000:
        raise HTTPException(status_code=400, detail="Input too long")

    # Basic rate limiting per IP
    client_ip = request.client.host if request.client else "unknown"
    now_ts = datetime.now(timezone.utc).timestamp()
    state = rate_limit_state.get(client_ip)
    if not state:
        rate_limit_state[client_ip] = {"window_start": now_ts, "count": 1}
    else:
        window_start = float(state["window_start"])  # type: ignore
        count = int(state["count"])  # type: ignore
        if now_ts - window_start <= RATE_LIMIT_WINDOW_SECONDS:
            if count >= RATE_LIMIT_MAX_REQUESTS:
                raise HTTPException(status_code=429, detail="Too many requests")
            state["count"] = count + 1
        else:
            # Reset window
            rate_limit_state[client_ip] = {"window_start": now_ts, "count": 1}

    # Build email
    msg = EmailMessage()
    msg['Subject'] = f"Portfolio Contact: {name}"
    msg['From'] = from_email
    msg['To'] = to_email
    msg['Reply-To'] = email_str
    msg.set_content(
        f"Name: {name}\nEmail: {email_str}\n\nMessage:\n{msg_text}"
    )

    # Persist a copy to Mongo (optional)
    try:
        await db.contact_messages.insert_one({
            "name": name,
            "email": email_str,
            "message": msg_text,
            "created_at": datetime.now(timezone.utc).isoformat()
        })
    except Exception:
        # Ignore DB errors for email delivery
        pass

    # Prefer Mailtrap Email API if token is provided; fallback to SMTP otherwise
    try:
        if api_token:
            api_url = 'https://send.api.mailtrap.io/api/send'
            api_payload = {
                "from": {"email": from_email},
                "to": [{"email": to_email}],
                "subject": msg['Subject'],
                "text": f"Name: {payload.name}\nEmail: {payload.email}\n\nMessage:\n{payload.message}",
                "headers": {"Reply-To": str(payload.email)},
            }
            headers = {
                "Authorization": f"Bearer {api_token}",
                "Content-Type": "application/json",
            }
            resp = requests.post(api_url, json=api_payload, headers=headers, timeout=15)
            if resp.status_code not in (200, 202):
                raise RuntimeError(f"Mailtrap API error {resp.status_code}: {resp.text}")
        else:
            context = ssl.create_default_context()
            if use_ssl or smtp_port == 465:
                with smtplib.SMTP_SSL(smtp_host, smtp_port, context=context) as server:
                    server.login(smtp_user, smtp_pass)
                    server.send_message(msg)
            else:
                with smtplib.SMTP(smtp_host, smtp_port) as server:
                    server.starttls(context=context)
                    server.login(smtp_user, smtp_pass)
                    server.send_message(msg)
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Failed to send email: {e}")

    return {"ok": True}

# Include the router in the main app
app.include_router(api_router)

origins_env = os.environ.get('CORS_ORIGINS', 'http://localhost:3001')
allow_origins = [o.strip() for o in origins_env.split(',') if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=allow_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.get("/ping")
async def ping():
    return {"status": "OK"}

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()