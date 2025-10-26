import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="portfolio-footer">
      <div className="footer-content">
        <div className="footer-text">
          <p>Crafted with <Heart size={16} className="heart-icon" fill="currentColor" /> by Alex Turner</p>
          <p className="copyright">© 2025 All Rights Reserved</p>
        </div>
        <div className="pixel-border"></div>
      </div>
    </footer>
  );
};

export default Footer;