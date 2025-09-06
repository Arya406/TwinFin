import React from 'react';
import Icon from '../../../components/AppIcon';

const UploadProgress = ({ 
  progress = 0, 
  status = 'uploading', 
  fileName = '', 
  estimatedTime = null,
  onCancel = null 
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'uploading':
        return {
          icon: 'Upload',
          title: 'Uploading Photo',
          description: 'Please wait while we process your image...',
          color: 'text-primary',
          bgColor: 'bg-primary/10',
          progressColor: 'bg-primary'
        };
      case 'processing':
        return {
          icon: 'Zap',
          title: 'Processing Image',
          description: 'Analyzing facial features for matching...',
          color: 'text-amber-500',
          bgColor: 'bg-amber-500/10',
          progressColor: 'bg-amber-500'
        };
      case 'success':
        return {
          icon: 'CheckCircle',
          title: 'Upload Complete',
          description: 'Your photo has been processed successfully!',
          color: 'text-success',
          bgColor: 'bg-success/10',
          progressColor: 'bg-success'
        };
      case 'error':
        return {
          icon: 'AlertCircle',
          title: 'Upload Failed',
          description: 'There was an error processing your photo. Please try again.',
          color: 'text-error',
          bgColor: 'bg-error/10',
          progressColor: 'bg-error'
        };
      default:
        return {
          icon: 'Upload',
          title: 'Uploading',
          description: 'Processing...',
          color: 'text-primary',
          bgColor: 'bg-primary/10',
          progressColor: 'bg-primary'
        };
    }
  };

  const config = getStatusConfig();
  const isComplete = status === 'success';
  const hasError = status === 'error';
  const isActive = status === 'uploading' || status === 'processing';

  const formatTime = (seconds) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className={`${config?.bgColor} rounded-xl p-6 space-y-4`}>
        {/* Status Icon and Title */}
        <div className="text-center space-y-3">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${config?.bgColor} ${config?.color}`}>
            {isActive ? (
              <div className="relative">
                <Icon name={config?.icon} size={28} strokeWidth={2} />
                <div className="absolute inset-0 animate-pulse">
                  <Icon name={config?.icon} size={28} strokeWidth={2} />
                </div>
              </div>
            ) : (
              <Icon name={config?.icon} size={28} strokeWidth={2} />
            )}
          </div>
          
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-text-primary">{config?.title}</h3>
            <p className="text-text-secondary text-sm">{config?.description}</p>
          </div>
        </div>

        {/* Progress Bar */}
        {!hasError && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">Progress</span>
              <span className="text-text-primary font-medium">{Math.round(progress)}%</span>
            </div>
            
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div
                className={`h-full ${config?.progressColor} transition-all duration-300 ease-out`}
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* File Information */}
        {fileName && (
          <div className="bg-surface/50 rounded-lg p-3 space-y-2">
            <div className="flex items-center space-x-2">
              <Icon name="File" size={16} className="text-text-secondary" />
              <span className="text-text-primary text-sm font-medium truncate">{fileName}</span>
            </div>
            
            {estimatedTime && isActive && (
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} className="text-text-secondary" />
                <span className="text-text-secondary text-sm">
                  Estimated time: {formatTime(estimatedTime)}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center space-x-3">
          {isActive && onCancel && (
            <button
              onClick={onCancel}
              className="px-4 py-2 text-text-secondary hover:text-text-primary transition-colors duration-200 text-sm font-medium"
            >
              Cancel Upload
            </button>
          )}
          
          {hasError && (
            <button
              onClick={() => window.location?.reload()}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200 text-sm font-medium"
            >
              Try Again
            </button>
          )}
        </div>

        {/* Processing Steps */}
        {isActive && (
          <div className="space-y-2">
            <div className="text-xs text-text-secondary text-center">Processing steps:</div>
            <div className="flex justify-center space-x-4">
              <div className={`flex items-center space-x-1 ${progress >= 25 ? config?.color : 'text-text-secondary'}`}>
                <Icon name="Upload" size={12} />
                <span className="text-xs">Upload</span>
              </div>
              <div className={`flex items-center space-x-1 ${progress >= 50 ? config?.color : 'text-text-secondary'}`}>
                <Icon name="Scan" size={12} />
                <span className="text-xs">Analyze</span>
              </div>
              <div className={`flex items-center space-x-1 ${progress >= 75 ? config?.color : 'text-text-secondary'}`}>
                <Icon name="Search" size={12} />
                <span className="text-xs">Match</span>
              </div>
              <div className={`flex items-center space-x-1 ${progress >= 100 ? config?.color : 'text-text-secondary'}`}>
                <Icon name="CheckCircle" size={12} />
                <span className="text-xs">Complete</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadProgress;