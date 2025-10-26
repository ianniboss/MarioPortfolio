import React, { useState } from 'react';
import { socialLinks } from '../mock';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import * as Icons from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { Toaster } from './ui/toaster';
import { useLanguage } from '../context/LanguageContext';

const ContactSection = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: t.contact.toastTitle,
      description: t.contact.toastDescription,
    });
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="contact-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">{t.contact.title}</h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">{t.contact.subtitle}</p>
        </div>

        <div className="contact-content">
          <Card className="contact-card">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label className="form-label">{t.contact.playerName}</label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t.contact.namePlaceholder}
                  required
                  className="game-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">{t.contact.emailAddress}</label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t.contact.emailPlaceholder}
                  required
                  className="game-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">{t.contact.message}</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t.contact.messagePlaceholder}
                  rows={5}
                  required
                  className="game-input"
                />
              </div>

              <Button type="submit" className="submit-button">
                {t.contact.sendBtn}
              </Button>
            </form>
          </Card>

          <div className="social-links">
            <h3 className="social-title">{t.contact.socialTitle}</h3>
            <div className="social-grid">
              {socialLinks.map((social) => {
                const IconComponent = Icons[social.icon.charAt(0).toUpperCase() + social.icon.slice(1)] || Icons.Globe;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                  >
                    <IconComponent size={24} />
                    <span>{social.name}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </section>
  );
};

export default ContactSection;