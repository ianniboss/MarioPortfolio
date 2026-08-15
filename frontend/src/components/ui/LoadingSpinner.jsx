import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-container">
      <div className="retro-spinner">
        <div className="spinner-cube"></div>
        <div className="spinner-cube"></div>
        <div className="spinner-cube"></div>
        <div className="spinner-cube"></div>
      </div>
      <p className="loading-text">LOADING...</p>
    </div>
  );
};

export default LoadingSpinner;
