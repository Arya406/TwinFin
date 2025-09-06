import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const SocialProof = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      text: "Found my twin from across the world! Amazing technology and so much fun to use.",
      rating: 5,
      location: "New York, USA"
    },
    {
      id: 2,
      name: "Miguel Rodriguez",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      text: "The facial matching is incredibly accurate. Connected with people who look just like me!",
      rating: 5,
      location: "Madrid, Spain"
    },
    {
      id: 3,
      name: "Priya Patel",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      text: "Such a unique way to meet new people. The chat feature makes it easy to connect.",
      rating: 5,
      location: "Mumbai, India"
    }
  ];

  const stats = [
    { label: "Active Users", value: "10,000+", icon: "Users" },
    { label: "Matches Made", value: "50,000+", icon: "Heart" },
    { label: "Countries", value: "50+", icon: "Globe" },
    { label: "Success Rate", value: "94%", icon: "TrendingUp" }
  ];

  return (
    <div className="space-y-8">
      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4">
        {stats?.map((stat, index) => (
          <div key={index} className="text-center p-4 bg-surface rounded-lg border border-border">
            <div className="flex justify-center mb-2">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon 
                  name={stat?.icon} 
                  size={16} 
                  color="var(--color-primary)" 
                  strokeWidth={2}
                />
              </div>
            </div>
            <div className="text-lg font-bold text-text-primary">{stat?.value}</div>
            <div className="text-xs text-text-secondary">{stat?.label}</div>
          </div>
        ))}
      </div>
      {/* Testimonials */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-text-primary text-center">
          What Our Users Say
        </h3>
        
        <div className="space-y-4 max-h-80 overflow-y-auto">
          {testimonials?.map((testimonial) => (
            <div key={testimonial?.id} className="bg-surface rounded-lg p-4 border border-border">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <Image
                    src={testimonial?.avatar}
                    alt={testimonial?.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-sm font-medium text-text-primary">
                      {testimonial?.name}
                    </h4>
                    <div className="flex items-center">
                      {[...Array(testimonial?.rating)]?.map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={12}
                          color="var(--color-warning)"
                          strokeWidth={0}
                          className="fill-current"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-text-secondary mb-2">
                    {testimonial?.location}
                  </p>
                  <p className="text-sm text-text-primary">
                    "{testimonial?.text}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Trust Indicators */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-4">
        <div className="text-center space-y-2">
          <div className="flex justify-center items-center space-x-2">
            <Icon name="Award" size={20} color="var(--color-primary)" />
            <span className="text-sm font-medium text-text-primary">
              Trusted by thousands worldwide
            </span>
          </div>
          <p className="text-xs text-text-secondary">
            Join the global community of twin finders
          </p>
        </div>
      </div>
    </div>
  );
};

export default SocialProof;