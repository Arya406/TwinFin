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
    <section className="">
     
    </section>
  );
};

export default HowItWorksSection;