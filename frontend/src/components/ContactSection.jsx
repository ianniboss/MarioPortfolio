import React, { useState } from 'react';
import { socialLinks } from '../mock';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import * as Icons from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { Toaster } from './ui/toaster';

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Your message has been received. I'll get back to you soon!",
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
          <h2 className="section-title">Pause Menu</h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">Ready to start a new quest together?</p>
        </div>

        <div className="contact-content">
          <Card className="contact-card">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label className="form-label">Player Name</label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="game-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  className="game-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Message</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows={5}
                  required
                  className="game-input"
                />
              </div>

              <Button type="submit" className="submit-button">
                Send Message
              </Button>
            </form>
          </Card>

          <div className="social-links">
            <h3 className="social-title">Join My World</h3>
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