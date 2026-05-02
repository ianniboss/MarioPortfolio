import React, { useEffect, useState } from 'react';
import { hasAnalyticsConfig, loadAnalytics } from '../lib/analytics';

const STORAGE_KEY = 'portfolio_analytics_consent';

const AnalyticsConsent = () => {
  const [consent, setConsent] = useState(() => {
    if (typeof window === 'undefined') return 'unset';
    return localStorage.getItem(STORAGE_KEY) || 'unset';
  });

  useEffect(() => {
    if (consent === 'accepted') {
      loadAnalytics().catch(() => {
        // Analytics should never block the portfolio experience.
      });
    }
  }, [consent]);

  const updateConsent = (value) => {
    localStorage.setItem(STORAGE_KEY, value);
    setConsent(value);
  };

  if (!hasAnalyticsConfig || consent !== 'unset') {
    return null;
  }

  return (
    <div className="analytics-consent" role="region" aria-label="Analytics consent">
      <div>
        <p className="analytics-consent-title">Help improve this portfolio?</p>
        <p className="analytics-consent-copy">
          I use privacy-friendly analytics to understand which sections are useful. No tracking loads unless you accept.
        </p>
      </div>
      <div className="analytics-consent-actions">
        <button type="button" className="analytics-consent-button secondary" onClick={() => updateConsent('declined')}>
          Decline
        </button>
        <button type="button" className="analytics-consent-button primary" onClick={() => updateConsent('accepted')}>
          Accept
        </button>
      </div>
    </div>
  );
};

export default AnalyticsConsent;
