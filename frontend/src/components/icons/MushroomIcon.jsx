import React from 'react';

export default function MushroomIcon({ size = 18, variant = 'red', className, ...props }) {
  const capColor = variant === 'green' ? '#2ecc71' : '#e74c3c';
  const stemColor = '#f6e7c1';
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {/* Cap (semi-circle) */}
      <path d="M8 32a24 24 0 0 1 48 0v8H8v-8z" fill={capColor} stroke="currentColor" strokeWidth="3" />
      {/* Cap spots */}
      <circle cx="24" cy="26" r="6" fill="#ffffff" />
      <circle cx="40" cy="26" r="6" fill="#ffffff" />
      <circle cx="32" cy="18" r="5" fill="#ffffff" />
      {/* Stem */}
      <rect x="22" y="40" width="20" height="16" rx="4" fill={stemColor} stroke="currentColor" strokeWidth="3" />
      {/* Eyes */}
      <circle cx="28" cy="48" r="2.5" fill="#242424" />
      <circle cx="36" cy="48" r="2.5" fill="#242424" />
    </svg>
  );
}