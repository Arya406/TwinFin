import React, { useState, useEffect } from 'react';


const NotificationIndicator = ({ 
  count = 0, 
  maxCount = 99,
  showZero = false,
  size = 'default',
  position = 'top-right',
  color = 'error',
  pulse = false,
  onClick = null
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    setDisplayCount(count > maxCount ? maxCount : count);
    setIsVisible(count > 0 || showZero);
  }, [count, maxCount, showZero]);

  if (!isVisible) return null;

  const sizeClasses = {
    sm: 'w-4 h-4 text-xs',
    default: 'w-5 h-5 text-xs',
    lg: 'w-6 h-6 text-sm'
  };

  const positionClasses = {
    'top-right': '-top-2 -right-2',
    'top-left': '-top-2 -left-2',
    'bottom-right': '-bottom-2 -right-2',
    'bottom-left': '-bottom-2 -left-2'
  };

  const colorClasses = {
    error: 'bg-error text-error-foreground',
    warning: 'bg-warning text-warning-foreground',
    success: 'bg-success text-success-foreground',
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground'
  };

  const handleClick = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (onClick) {
      onClick(count);
    }
  };

  return (
    <div
      className={`
        absolute ${positionClasses?.[position]} 
        ${sizeClasses?.[size]} 
        ${colorClasses?.[color]}
        ${pulse ? 'animate-pulse-slow' : ''}
        ${onClick ? 'cursor-pointer hover:scale-110' : ''}
        rounded-full flex items-center justify-center font-medium
        shadow-elevation-2 border-2 border-surface
        transition-transform duration-200 ease-out
        z-1001
      `}
      onClick={onClick ? handleClick : undefined}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e?.key === 'Enter' || e?.key === ' ') {
          e?.preventDefault();
          handleClick(e);
        }
      } : undefined}
    >
      {count > maxCount ? `${maxCount}+` : displayCount}
    </div>
  );
};

// Wrapper component for easy integration with navigation items
export const NavigationNotification = ({ 
  children, 
  count = 0, 
  ...notificationProps 
}) => {
  return (
    <div className="relative inline-block">
      {children}
      <NotificationIndicator count={count} {...notificationProps} />
    </div>
  );
};

export default NotificationIndicator;