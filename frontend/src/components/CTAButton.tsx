// CTAButton.jsx
import React from 'react';

const CTAButton = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  className = '',
  disabled = false,
  ...props 
}) => {
  const baseClasses = 'font-semibold rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-opacity-50';
  
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:from-blue-700 hover:to-indigo-800 focus:ring-blue-500 shadow-xl',
    secondary: 'bg-white text-gray-800 border border-gray-200 hover:border-blue-300 hover:shadow-blue-200/50 focus:ring-gray-300',
    glass: 'bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 focus:ring-white',
    dark: 'bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-500 shadow-xl',
    outline: 'bg-white text-gray-800 border-2 border-gray-300 hover:bg-gray-50 focus:ring-gray-300'
  };

  const sizes = {
    sm: 'px-6 py-3 text-sm',
    md: 'px-8 py-4 text-base',
    lg: 'px-10 py-5 text-lg font-bold'
  };

  const classes = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `.trim();

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default CTAButton;