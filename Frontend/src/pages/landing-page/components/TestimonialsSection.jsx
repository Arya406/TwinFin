import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Jessica Chen',
      location: 'San Francisco, CA',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      rating: 5,
      text: `I couldn't believe how accurate the matches were! I found my facial twin living in Tokyo, and we've been chatting for months now. It's amazing how similar we look despite being from different continents.`,
      matchPercentage: 96
    },
    {
      id: 2,
      name: 'Marcus Johnson',location: 'London, UK',avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',rating: 5,text: `The AI technology is incredible! Within minutes of uploading my photo, I had multiple high-percentage matches. I've connected with people from 5 different countries who all share my facial features.`,
      matchPercentage: 94
    },
    {
      id: 3,
      name: 'Priya Patel',
      location: 'Mumbai, India',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      rating: 5,
      text: `This app changed my perspective on global connections. Finding someone who looks so similar to me in Brazil was surreal. We've become great friends and plan to meet in person soon!`,
      matchPercentage: 92
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        color={index < rating ? 'var(--color-accent)' : 'var(--color-border)'}
        strokeWidth={0}
        className={index < rating ? 'fill-current' : ''}
      />
    ));
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-6">
            What Our Users Say
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Join thousands of users who have discovered their facial twins and built meaningful connections across the globe.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials?.map((testimonial) => (
            <div
              key={testimonial?.id}
              className="bg-card rounded-2xl p-6 shadow-elevation-2 hover:shadow-elevation-3 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Header */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative">
                  <Image
                    src={testimonial?.avatar}
                    alt={`${testimonial?.name} profile`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                    <Icon name="Check" size={12} color="white" strokeWidth={3} />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-text-primary">{testimonial?.name}</h4>
                  <p className="text-sm text-text-secondary">{testimonial?.location}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-success mb-1">
                    {testimonial?.matchPercentage}% Match
                  </div>
                  <div className="flex space-x-1">
                    {renderStars(testimonial?.rating)}
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="relative">
                <Icon
                  name="Quote"
                  size={24}
                  color="var(--color-primary)"
                  className="absolute -top-2 -left-2 opacity-20"
                />
                <p className="text-text-secondary leading-relaxed pl-4">
                  "{testimonial?.text}"
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16">
          <div className="bg-card rounded-2xl p-8 shadow-elevation-2">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-text-primary mb-2">
                Trusted & Secure
              </h3>
              <p className="text-text-secondary">
                Your privacy and security are our top priorities
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Icon name="Shield" size={32} color="var(--color-success)" />
                </div>
                <h4 className="font-semibold text-text-primary mb-1">SSL Encrypted</h4>
                <p className="text-sm text-text-secondary">256-bit encryption</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Icon name="Lock" size={32} color="var(--color-primary)" />
                </div>
                <h4 className="font-semibold text-text-primary mb-1">Privacy First</h4>
                <p className="text-sm text-text-secondary">GDPR compliant</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Icon name="Database" size={32} color="var(--color-secondary)" />
                </div>
                <h4 className="font-semibold text-text-primary mb-1">Secure Storage</h4>
                <p className="text-sm text-text-secondary">Protected servers</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Icon name="Award" size={32} color="var(--color-accent)" />
                </div>
                <h4 className="font-semibold text-text-primary mb-1">Certified</h4>
                <p className="text-sm text-text-secondary">ISO 27001</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;