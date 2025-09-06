import React from 'react';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const HeroSection = ({ onGetStarted }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-tight">
                Find your{' '}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  twin
                </span>{' '}
                from anywhere in the world
              </h1>
              <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto lg:mx-0">
                Discover people who share your facial features using advanced AI technology. Connect with your lookalikes and build meaningful relationships across the globe.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                variant="default"
                size="lg"
                onClick={onGetStarted}
                iconName="Camera"
                iconPosition="left"
                className="text-lg px-8 py-4 shadow-elevation-3 hover:shadow-elevation-4 transition-shadow duration-300"
              >
                Upload Your Photo
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="Play"
                iconPosition="left"
                className="text-lg px-8 py-4"
              >
                See How It Works
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center lg:justify-start space-x-6 pt-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                  <span className="text-success-foreground text-sm font-bold">✓</span>
                </div>
                <span className="text-sm text-text-secondary">100% Secure</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                  <span className="text-success-foreground text-sm font-bold">✓</span>
                </div>
                <span className="text-sm text-text-secondary">AI Powered</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                  <span className="text-success-foreground text-sm font-bold">✓</span>
                </div>
                <span className="text-sm text-text-secondary">Global Network</span>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative z-10 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-card rounded-2xl p-4 shadow-elevation-3 hover:shadow-elevation-4 transition-shadow duration-300">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
                    alt="User profile example"
                    className="w-full h-32 object-cover rounded-xl mb-3"
                  />
                  <div className="text-center">
                    <p className="font-semibold text-text-primary">Alex M.</p>
                    <p className="text-sm text-success">98% Match</p>
                  </div>
                </div>
                <div className="bg-card rounded-2xl p-4 shadow-elevation-3 hover:shadow-elevation-4 transition-shadow duration-300">
                  <Image
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face"
                    alt="User profile example"
                    className="w-full h-32 object-cover rounded-xl mb-3"
                  />
                  <div className="text-center">
                    <p className="font-semibold text-text-primary">Sarah K.</p>
                    <p className="text-sm text-success">95% Match</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-card rounded-2xl p-4 shadow-elevation-3 hover:shadow-elevation-4 transition-shadow duration-300">
                  <Image
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"
                    alt="User profile example"
                    className="w-full h-32 object-cover rounded-xl mb-3"
                  />
                  <div className="text-center">
                    <p className="font-semibold text-text-primary">Mike R.</p>
                    <p className="text-sm text-success">92% Match</p>
                  </div>
                </div>
                <div className="bg-card rounded-2xl p-4 shadow-elevation-3 hover:shadow-elevation-4 transition-shadow duration-300">
                  <Image
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face"
                    alt="User profile example"
                    className="w-full h-32 object-cover rounded-xl mb-3"
                  />
                  <div className="text-center">
                    <p className="font-semibold text-text-primary">Emma L.</p>
                    <p className="text-sm text-success">89% Match</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Connecting Lines Animation */}
            <div className="absolute inset-0 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 300 400">
                <path
                  d="M150 50 Q200 100 150 150 Q100 200 150 250 Q200 300 150 350"
                  stroke="url(#gradient)"
                  strokeWidth="2"
                  fill="none"
                  className="animate-pulse-slow"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="var(--color-secondary)" stopOpacity="0.6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;