import React from 'react';

import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const EmptyState = ({ onUploadNew, onRefresh }) => {
  return (
    <div className="text-center py-12">
      <div className="max-w-md mx-auto">
        <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
          <Icon name="Search" size={32} color="var(--color-text-secondary)" />
        </div>
        
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          No Matches Found
        </h3>
        
        <p className="text-text-secondary mb-6">
          We couldn't find any facial similarity matches for your photo. Try uploading a different photo or check back later as our database grows.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="default"
            iconName="Upload"
            iconPosition="left"
            onClick={onUploadNew}
            className="touch-target"
          >
            Upload New Photo
          </Button>
          
          <Button
            variant="outline"
            iconName="RefreshCw"
            iconPosition="left"
            onClick={onRefresh}
            className="touch-target"
          >
            Try Again
          </Button>
        </div>
        
        <div className="mt-8 p-4 bg-muted rounded-lg">
          <h4 className="font-medium text-text-primary mb-2">Tips for better matches:</h4>
          <ul className="text-sm text-text-secondary space-y-1">
            <li>• Use a clear, well-lit photo</li>
            <li>• Face the camera directly</li>
            <li>• Avoid sunglasses or face coverings</li>
            <li>• Use a recent photo</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;