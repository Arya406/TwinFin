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
    <section className="">
     
    </section>
  );
};

export default TestimonialsSection;