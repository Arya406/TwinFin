import React from 'react';
import Icon from '../../../components/AppIcon';

const LoadingState = ({ progress = 0, message = "Finding your twins..." }) => {
  return (
    <div className="text-center py-12">
      <div className="max-w-md mx-auto">
        {/* Animated Icon */}
        <div className="w-24 h-24 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
          <Icon 
            name="Search" 
            size={32} 
            color="var(--color-primary)" 
            className="animate-pulse-slow"
          />
        </div>
        
        {/* Loading Message */}
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          Analyzing Your Photo
        </h3>
        
        <p className="text-text-secondary mb-6">
          {message}
        </p>
        
        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2 mb-4">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className="text-sm text-text-secondary">
          {progress}% Complete
        </p>
        
        {/* Processing Steps */}
        <div className="mt-8 space-y-3">
          <div className="flex items-center justify-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-success rounded-full" />
            <span className="text-text-secondary">Photo uploaded successfully</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-sm">
            <div className={`w-2 h-2 rounded-full ${progress > 30 ? 'bg-success' : 'bg-muted animate-pulse'}`} />
            <span className="text-text-secondary">Facial features detected</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-sm">
            <div className={`w-2 h-2 rounded-full ${progress > 60 ? 'bg-success' : 'bg-muted animate-pulse'}`} />
            <span className="text-text-secondary">Comparing with database</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-sm">
            <div className={`w-2 h-2 rounded-full ${progress > 90 ? 'bg-success' : 'bg-muted animate-pulse'}`} />
            <span className="text-text-secondary">Calculating similarity scores</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;