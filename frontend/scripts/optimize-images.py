from pathlib import Path

from PIL import Image, ImageOps


IMAGE_DIR = Path(__file__).resolve().parents[1] / "public" / "img"
SOURCE_EXTENSIONS = {".png", ".jpg", ".jpeg"}
MAX_WIDTH = 1400
QUALITY = 82


def optimize_image(path: Path) -> tuple[int, int]:
    output = path.with_suffix(".webp")
    original_size = path.stat().st_size

    with Image.open(path) as image:
        image = ImageOps.exif_transpose(image)
        if image.mode not in ("RGB", "RGBA"):
            image = image.convert("RGBA" if "A" in image.getbands() else "RGB")

        if image.width > MAX_WIDTH:
            ratio = MAX_WIDTH / image.width
            height = round(image.height * ratio)
            image = image.resize((MAX_WIDTH, height), Image.Resampling.LANCZOS)

        image.save(output, "WEBP", quality=QUALITY, method=6)

    if output.stat().st_size >= original_size:
        output.unlink()
        return original_size, original_size

    return original_size, output.stat().st_size


def main() -> None:
    total_original = 0
    total_optimized = 0

    for path in sorted(IMAGE_DIR.iterdir()):
        if path.suffix.lower() not in SOURCE_EXTENSIONS:
            continue

        original, optimized = optimize_image(path)
        total_original += original
        total_optimized += optimized
        saved = original - optimized
        print(f"{path.name} -> {path.with_suffix('.webp').name}: saved {saved / 1024:.1f} KB")

    print()
    print(f"Original:  {total_original / 1024:.1f} KB")
    print(f"Optimized: {total_optimized / 1024:.1f} KB")
    print(f"Saved:     {(total_original - total_optimized) / 1024:.1f} KB")


if __name__ == "__main__":
    main()
