import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CallToActionSection = ({ onGetStarted }) => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-card rounded-3xl shadow-elevation-4 overflow-hidden">
          <div className="relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-secondary rounded-full blur-3xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-accent rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 px-8 py-16 text-center">
              <div className="max-w-4xl mx-auto space-y-8">
                {/* Icon */}
                <div className="flex justify-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-elevation-3">
                    <Icon name="Sparkles" size={40} color="white" strokeWidth={2} />
                  </div>
                </div>

                {/* Heading */}
                <div className="space-y-4">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary">
                    Ready to Find Your{' '}
                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      Facial Twin?
                    </span>
                  </h2>
                  <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto">
                    Join millions of users worldwide who have discovered their lookalikes and built amazing connections. Your twin is waiting to meet you!
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button
                    variant="default"
                    size="xl"
                    onClick={onGetStarted}
                    iconName="Camera"
                    iconPosition="left"
                    className="text-xl px-12 py-6 shadow-elevation-3 hover:shadow-elevation-4 transition-all duration-300 hover:scale-105"
                  >
                    Start Finding Twins Now
                  </Button>
                  <Button
                    variant="outline"
                    size="xl"
                    iconName="Info"
                    iconPosition="left"
                    className="text-xl px-12 py-6"
                  >
                    Learn More
                  </Button>
                </div>

                {/* Features List */}
                <div className="grid sm:grid-cols-3 gap-6 pt-8">
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="Check" size={16} color="white" strokeWidth={3} />
                    </div>
                    <span className="text-text-secondary">Free to start</span>
                  </div>
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="Check" size={16} color="white" strokeWidth={3} />
                    </div>
                    <span className="text-text-secondary">Instant results</span>
                  </div>
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="Check" size={16} color="white" strokeWidth={3} />
                    </div>
                    <span className="text-text-secondary">Global matches</span>
                  </div>
                </div>

                {/* Stats */}
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;