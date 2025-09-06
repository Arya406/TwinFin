import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'SSL Encrypted',
      description: 'Your data is protected with 256-bit encryption'
    },
    {
      icon: 'Lock',
      title: 'Secure Storage',
      description: 'Photos are stored securely and never shared'
    },
    {
      icon: 'Eye',
      title: 'Privacy First',
      description: 'Your matches remain private and confidential'
    }
  ];

  return (
    <div className="bg-muted/50 rounded-lg p-6 space-y-4">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          Your Security Matters
        </h3>
        <p className="text-sm text-text-secondary">
          We use industry-standard security measures to protect your data
        </p>
      </div>
      <div className="space-y-3">
        {securityFeatures?.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
              <Icon 
                name={feature?.icon} 
                size={16} 
                color="var(--color-success)" 
                strokeWidth={2}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary">
                {feature?.title}
              </p>
              <p className="text-xs text-text-secondary">
                {feature?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecurityBadges;