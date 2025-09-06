import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthenticationGuard = ({ 
  children, 
  user = null, 
  redirectTo = '/authentication',
  requireAuth = true 
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (requireAuth && !user) {
      // Store the intended destination for redirect after login
      const intendedPath = location?.pathname + location?.search;
      navigate(redirectTo, { 
        state: { from: intendedPath },
        replace: true 
      });
    }
  }, [user, requireAuth, navigate, redirectTo, location]);

  // Show loading state while checking authentication
  if (requireAuth && user === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-text-secondary">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Don't render protected content if user is not authenticated
  if (requireAuth && !user) {
    return null;
  }

  return children;
};

export default AuthenticationGuard;