import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const NavigationBar = ({ user = null, notificationCount = 0 }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
   
    {
      label: 'Upload',
      path: '/photo-upload',
      icon: 'Upload',
      protected: true
    },
    {
      label: 'Matches',
      path: '/match-results',
      icon: 'Users',
      protected: true
    },
    {
      label: 'Chat',
      path: '/chat-interface',
      icon: 'MessageCircle',
      protected: true,
      hasNotification: notificationCount > 0
    },
    {
      label: 'Get Started',
      path: '/authentication',
      icon: user ? 'User' : 'LogIn',
      protected: false
    }
  ];

  const isActiveRoute = (path) => {
    return location?.pathname === path;
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location?.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const Logo = () => (
    <Link to="/landing-page" className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200">
      <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
        <Icon name="Zap" size={20} color="white" strokeWidth={2.5} />
      </div>
      <span className="text-xl font-bold text-text-primary">Face Twin Finder</span>
    </Link>
  );

  const NavigationItem = ({ item, isMobile = false }) => {
    const isActive = isActiveRoute(item?.path);
    const canAccess = !item?.protected || user;
    
    if (!canAccess && item?.protected) {
      return null;
    }

    return (
      <Link
        to={item?.path}
        onClick={isMobile ? closeMobileMenu : undefined}
        className={`
          relative flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ease-out
          ${isMobile ? 'w-full justify-start text-lg py-4' : 'text-base'}
          ${isActive 
            ? 'bg-primary text-primary-foreground shadow-elevation-2' 
            : 'text-text-secondary hover:text-text-primary hover:bg-muted'
          }
          touch-target
        `}
      >
        <div className="relative">
          <Icon 
            name={item?.icon} 
            size={isMobile ? 24 : 20} 
            color="currentColor" 
            strokeWidth={isActive ? 2.5 : 2}
          />
          {item?.hasNotification && notificationCount > 0 && (
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-error text-error-foreground text-xs font-medium rounded-full flex items-center justify-center z-1001">
              {notificationCount > 99 ? '99+' : notificationCount}
            </div>
          )}
        </div>
        <span className={`font-medium ${isActive ? 'font-semibold' : ''}`}>
          {item?.label}
        </span>
      </Link>
    );
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-1000 bg-surface/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Logo />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navigationItems?.map((item) => (
                <NavigationItem key={item?.path} item={item} />
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleMobileMenuToggle}
                className="touch-target"
                aria-label="Toggle mobile menu"
              >
                <Icon
                  name={isMobileMenuOpen ? 'X' : 'Menu'}
                  size={24}
                  color="currentColor"
                />
              </Button>
            </div>
          </div>
        </div>
      </nav>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-1100 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeMobileMenu}
          />
          
          {/* Menu Panel */}
          <div className="absolute top-16 left-0 right-0 bg-surface border-b border-border shadow-elevation-4">
            <div className="px-4 py-6 space-y-2">
              {navigationItems?.map((item) => (
                <NavigationItem key={item?.path} item={item} isMobile />
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Spacer to prevent content overlap */}
      <div className="h-16" />
    </>
  );
};

export default NavigationBar;