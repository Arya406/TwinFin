import React from 'react';
import Icon from '../../../components/AppIcon';

const HowItWorksSection = () => {
  const steps = [
    {
      id: 1,
      icon: 'Upload',
      title: 'Upload Your Photo',
      description: 'Simply upload a clear photo of yourself. Our AI will analyze your facial features securely and privately.',
      color: 'primary'
    },
    {
      id: 2,
      icon: 'Zap',
      title: 'AI Analysis',
      description: 'Our advanced facial recognition technology processes your image and identifies unique facial characteristics.',
      color: 'secondary'
    },
    {
      id: 3,
      icon: 'Users',
      title: 'Find Matches',
      description: 'Discover people from around the world who share similar facial features with percentage-based similarity scores.',
      color: 'accent'
    },
    {
      id: 4,
      icon: 'MessageCircle',
      title: 'Connect & Chat',
      description: 'Start conversations with your matches and build meaningful connections with your facial twins globally.',
      color: 'success'
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      primary: 'bg-primary text-primary-foreground',
      secondary: 'bg-secondary text-secondary-foreground',
      accent: 'bg-accent text-accent-foreground',
      success: 'bg-success text-success-foreground'
    };
    return colorMap?.[color] || colorMap?.primary;
  };

  return (
    <section className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-6">
            How It Works
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Our simple 4-step process uses cutting-edge AI technology to help you discover your facial twins and connect with them instantly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps?.map((step, index) => (
            <div key={step?.id} className="relative">
              {/* Connection Line */}
              {index < steps?.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-border to-transparent z-0" />
              )}
              
              <div className="relative z-10 bg-card rounded-2xl p-6 shadow-elevation-2 hover:shadow-elevation-3 transition-all duration-300 hover:-translate-y-1 text-center">
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className={`w-8 h-8 rounded-full ${getColorClasses(step?.color)} flex items-center justify-center text-sm font-bold shadow-elevation-2`}>
                    {step?.id}
                  </div>
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl ${getColorClasses(step?.color)} flex items-center justify-center mx-auto mb-6 mt-4`}>
                  <Icon name={step?.icon} size={32} color="currentColor" strokeWidth={2} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  {step?.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {step?.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-card rounded-2xl p-8 shadow-elevation-2 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">10M+</div>
                <p className="text-text-secondary">Photos Analyzed</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-2">500K+</div>
                <p className="text-text-secondary">Active Users</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-success mb-2">99.9%</div>
                <p className="text-text-secondary">Accuracy Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;