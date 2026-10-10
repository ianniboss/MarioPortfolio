import './Footer.css';
import React from 'react';
import { Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t, language } = useLanguage();
  
  return (
    <footer className="portfolio-footer">
      <div className="footer-content">
        <div className="footer-text flex flex-col items-center">
          <p>{t.footer.craftedBy} <Heart size={16} className="heart-icon inline" fill="currentColor" /> {t.footer.by}</p>
          <p className="copyright">{t.footer.copyright}</p>
          <a href="/legal" className="text-xs text-gray-500 hover:text-white transition-colors mt-2">
            {language === 'fr' ? 'Mentions légales' : 'Legal Notice'}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
