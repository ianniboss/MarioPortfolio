import React from 'react';
import { Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="portfolio-footer">
      <div className="footer-content">
        <div className="footer-text">
          <p>{t.footer.craftedBy} <Heart size={16} className="heart-icon" fill="currentColor" /> {t.footer.by}</p>
          <p className="copyright">{t.footer.copyright}</p>
        </div>
        <div className="pixel-border"></div>
      </div>
    </footer>
  );
};

export default Footer;