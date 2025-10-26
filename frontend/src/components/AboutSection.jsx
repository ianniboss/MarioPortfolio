import React, { useState } from 'react';
import { profileData } from '../mock';
import { Card } from './ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';

const AboutSection = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <section id="about" className="about-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">About Me</h2>
          <div className="title-underline"></div>
        </div>

        <div className="about-content">
          <div 
            className={`about-card-3d ${isFlipped ? 'flipped' : ''}`}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <Card className="about-card-front">
              <div className="card-inner">
                <div className="avatar-container">
                  <img 
                    src={profileData.avatar} 
                    alt={profileData.name}
                    className="avatar-image"
                  />
                  <div className="avatar-border"></div>
                </div>
                <div className="dialogue-box">
                  <div className="dialogue-arrow"></div>
                  <p className="dialogue-text">{profileData.about}</p>
                </div>
                <p className="flip-hint">Click to flip!</p>
              </div>
            </Card>

            <Card className="about-card-back">
              <div className="card-inner">
                <h3 className="contact-title">Contact Info</h3>
                <div className="contact-details">
                  <div className="contact-item">
                    <Mail className="contact-icon" />
                    <span>{profileData.email}</span>
                  </div>
                  <div className="contact-item">
                    <Phone className="contact-icon" />
                    <span>{profileData.phone}</span>
                  </div>
                  <div className="contact-item">
                    <MapPin className="contact-icon" />
                    <span>{profileData.location}</span>
                  </div>
                </div>
                <p className="flip-hint">Click to flip back!</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;