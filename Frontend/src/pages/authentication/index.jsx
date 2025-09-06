import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from '../../components/ui/NavigationBar';
import AuthTabs from './components/AuthTabs';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import SecurityBadges from './components/SecurityBadges';
import SocialProof from './components/SocialProof';
import Icon from '../../components/AppIcon';

const Authentication = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [isLoading, setIsLoading] = useState(false);

  const handleAuthSubmit = async (formData) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock authentication success
    console.log('Authentication successful:', formData);
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <NavigationBar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/landing-page" className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors duration-200 mb-4">
              <Icon name="ArrowLeft" size={20} />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
            
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-elevation-2">
                <Icon name="Zap" size={24} color="white" strokeWidth={2.5} />
              </div>
              <h1 className="text-3xl font-bold text-text-primary">
                Face Twin Finder
              </h1>
            </div>
            
            <p className="text-lg text-text-secondary max-w-md mx-auto">
              {activeTab === 'login' ?'Welcome back! Sign in to continue your twin discovery journey.' :'Join thousands of users finding their twins worldwide.'
              }
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Authentication Form */}
            <div className="order-2 lg:order-1">
              <div className="bg-surface rounded-2xl shadow-elevation-3 p-8 border border-border">
                <AuthTabs activeTab={activeTab} onTabChange={setActiveTab} />
                
                {activeTab === 'login' ? (
                  <LoginForm onSubmit={handleAuthSubmit} isLoading={isLoading} />
                ) : (
                  <SignupForm onSubmit={handleAuthSubmit} isLoading={isLoading} />
                )}
                
                <div className="mt-8 pt-6 border-t border-border">
                  <p className="text-center text-sm text-text-secondary">
                    {activeTab === 'login' ? (
                      <>
                        Don't have an account?{' '}
                        <button
                          onClick={() => setActiveTab('signup')}
                          className="text-primary hover:text-primary/80 font-medium transition-colors duration-200"
                        >
                          Sign up here
                        </button>
                      </>
                    ) : (
                      <>
                        Already have an account?{' '}
                        <button
                          onClick={() => setActiveTab('login')}
                          className="text-primary hover:text-primary/80 font-medium transition-colors duration-200"
                        >
                          Sign in here
                        </button>
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Side Content */}
            <div className="order-1 lg:order-2 space-y-6">
              {/* Security Badges */}
              <SecurityBadges />
              
              {/* Social Proof */}
              
              
              {/* Feature Highlights */}
              <div className="bg-surface rounded-2xl shadow-elevation-2 p-6 border border-border">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  Why Choose Face Twin Finder?
                </h3>
                
                <div className="space-y-4">
                  {[
                    {
                      icon: 'Scan',
                      title: 'Advanced AI Matching',
                      description: 'Our cutting-edge facial recognition technology finds your perfect twins'
                    },
                    {
                      icon: 'MessageCircle',
                      title: 'Instant Chat',
                      description: 'Connect and chat with your matches in real-time'
                    },
                    {
                      icon: 'Globe',
                      title: 'Global Community',
                      description: 'Discover twins from around the world in our diverse community'
                    },
                    {
                      icon: 'Smartphone',
                      title: 'Mobile Optimized',
                      description: 'Perfect experience across all your devices'
                    }
                  ]?.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon 
                          name={feature?.icon} 
                          size={20} 
                          color="var(--color-primary)" 
                          strokeWidth={2}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-text-primary mb-1">
                          {feature?.title}
                        </h4>
                        <p className="text-xs text-text-secondary">
                          {feature?.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-bold text-text-primary mb-4">
                Ready to Find Your Twin?
              </h2>
              <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
                Join our growing community of users who have discovered their facial twins from around the world. 
                Start your journey today and see who you match with!
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="flex items-center space-x-2 text-sm text-text-secondary">
                  <Icon name="Check" size={16} color="var(--color-success)" />
                  <span>Free to join</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-text-secondary">
                  <Icon name="Check" size={16} color="var(--color-success)" />
                  <span>Instant matching</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-text-secondary">
                  <Icon name="Check" size={16} color="var(--color-success)" />
                  <span>Secure & private</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-surface border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Zap" size={16} color="white" strokeWidth={2.5} />
              </div>
              <span className="text-lg font-bold text-text-primary">Face Twin Finder</span>
            </div>
            
            <p className="text-sm text-text-secondary max-w-md mx-auto">
              Connecting people through facial similarity matching technology. 
              Find your twin from anywhere in the world.
            </p>
            
            <div className="flex items-center justify-center space-x-6 text-sm text-text-secondary">
              <Link to="/landing-page" className="hover:text-primary transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="/landing-page" className="hover:text-primary transition-colors duration-200">
                Terms of Service
              </Link>
              <Link to="/landing-page" className="hover:text-primary transition-colors duration-200">
                Support
              </Link>
            </div>
            
            <p className="text-xs text-text-secondary">
              © {new Date()?.getFullYear()} Face Twin Finder. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Authentication;