import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QualityValidator = ({ 
  validationResults = {}, 
  onRetake = null, 
  onProceed = null,
  isValidating = false 
}) => {
  const validationChecks = [
    {
      key: 'lighting',
      label: 'Lighting Quality',
      description: 'Image has adequate lighting for facial recognition',
      icon: 'Sun'
    },
    {
      key: 'faceDetection',
      label: 'Face Detection',
      description: 'A clear face is detected in the image',
      icon: 'User'
    },
    {
      key: 'imageQuality',
      label: 'Image Quality',
      description: 'Image resolution and clarity meet requirements',
      icon: 'Camera'
    },
    {
      key: 'faceSize',
      label: 'Face Size',
      description: 'Face occupies appropriate portion of the image',
      icon: 'Maximize'
    },
    {
      key: 'faceAngle',
      label: 'Face Angle',
      description: 'Face is positioned at an optimal angle',
      icon: 'RotateCw'
    }
  ];

  const getCheckStatus = (key) => {
    if (isValidating) return 'checking';
    if (validationResults?.[key] === undefined) return 'pending';
    return validationResults?.[key] ? 'passed' : 'failed';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'checking':
        return { icon: 'Loader', color: 'text-primary', spin: true };
      case 'passed':
        return { icon: 'CheckCircle', color: 'text-success', spin: false };
      case 'failed':
        return { icon: 'XCircle', color: 'text-error', spin: false };
      default:
        return { icon: 'Circle', color: 'text-text-secondary', spin: false };
    }
  };

  const overallScore = Object.keys(validationResults)?.length > 0 
    ? Math.round((Object.values(validationResults)?.filter(Boolean)?.length / validationChecks?.length) * 100)
    : 0;

  const allChecksPassed = validationChecks?.every(check => validationResults?.[check?.key] === true);
  const hasFailures = validationChecks?.some(check => validationResults?.[check?.key] === false);

  const getScoreColor = () => {
    if (overallScore >= 80) return 'text-success';
    if (overallScore >= 60) return 'text-warning';
    return 'text-error';
  };

  const getScoreBgColor = () => {
    if (overallScore >= 80) return 'bg-success/10';
    if (overallScore >= 60) return 'bg-warning/10';
    return 'bg-error/10';
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold text-text-primary">Photo Quality Check</h3>
        <p className="text-text-secondary">
          {isValidating 
            ? 'Analyzing your photo quality...' :'Review the quality assessment of your uploaded photo'
          }
        </p>
      </div>
      {/* Overall Score */}
      {!isValidating && Object.keys(validationResults)?.length > 0 && (
        <div className={`${getScoreBgColor()} rounded-xl p-6 text-center space-y-3`}>
          <div className="flex items-center justify-center space-x-3">
            <div className={`text-4xl font-bold ${getScoreColor()}`}>
              {overallScore}%
            </div>
            <div className="text-left">
              <div className="text-lg font-semibold text-text-primary">Quality Score</div>
              <div className={`text-sm ${getScoreColor()}`}>
                {overallScore >= 80 ? 'Excellent' : overallScore >= 60 ? 'Good' : 'Needs Improvement'}
              </div>
            </div>
          </div>
          
          {overallScore >= 80 && (
            <div className="flex items-center justify-center space-x-2 text-success">
              <Icon name="CheckCircle" size={16} />
              <span className="text-sm font-medium">Ready for matching!</span>
            </div>
          )}
        </div>
      )}
      {/* Validation Checks */}
      <div className="space-y-3">
        {validationChecks?.map((check) => {
          const status = getCheckStatus(check?.key);
          const statusConfig = getStatusIcon(status);
          
          return (
            <div
              key={check?.key}
              className={`
                bg-surface border rounded-lg p-4 transition-all duration-200
                ${status === 'passed' ? 'border-success bg-success/5' : 
                  status === 'failed'? 'border-error bg-error/5' : 'border-border'}
              `}
            >
              <div className="flex items-start space-x-3">
                <div className={`flex-shrink-0 ${statusConfig?.color}`}>
                  <Icon 
                    name={statusConfig?.icon} 
                    size={20} 
                    strokeWidth={2}
                    className={statusConfig?.spin ? 'animate-spin' : ''}
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-text-primary">{check?.label}</h4>
                    {status === 'passed' && (
                      <span className="text-xs font-medium text-success bg-success/10 px-2 py-1 rounded">
                        Passed
                      </span>
                    )}
                    {status === 'failed' && (
                      <span className="text-xs font-medium text-error bg-error/10 px-2 py-1 rounded">
                        Failed
                      </span>
                    )}
                    {status === 'checking' && (
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                        Checking...
                      </span>
                    )}
                  </div>
                  <p className="text-text-secondary text-sm">{check?.description}</p>
                  
                  {/* Specific feedback for failed checks */}
                  {status === 'failed' && (
                    <div className="mt-2 p-2 bg-error/5 rounded text-xs text-error">
                      {check?.key === 'lighting' && 'Try taking the photo in better lighting conditions.'}
                      {check?.key === 'faceDetection' && 'Make sure your face is clearly visible and not obscured.'}
                      {check?.key === 'imageQuality' && 'Use a higher quality camera or ensure the image is not blurry.'}
                      {check?.key === 'faceSize' && 'Move closer to the camera so your face fills more of the frame.'}
                      {check?.key === 'faceAngle' && 'Face the camera directly for the best results.'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Action Buttons */}
      {!isValidating && Object.keys(validationResults)?.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {hasFailures && onRetake && (
            <Button
              variant="outline"
              iconName="Camera"
              iconPosition="left"
              onClick={onRetake}
              className="flex-1 sm:flex-none"
            >
              Retake Photo
            </Button>
          )}
          
          {allChecksPassed && onProceed && (
            <Button
              variant="default"
              iconName="ArrowRight"
              iconPosition="right"
              onClick={onProceed}
              className="flex-1 sm:flex-none"
            >
              Find My Twins
            </Button>
          )}
          
          {!allChecksPassed && !hasFailures && onProceed && (
            <Button
              variant="secondary"
              iconName="ArrowRight"
              iconPosition="right"
              onClick={onProceed}
              className="flex-1 sm:flex-none"
            >
              Continue Anyway
            </Button>
          )}
        </div>
      )}
      {/* Tips for improvement */}
      {hasFailures && (
        <div className="bg-warning/5 border border-warning/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Lightbulb" size={20} className="text-warning flex-shrink-0" />
            <div className="space-y-2">
              <h4 className="font-medium text-text-primary">Tips for Better Results</h4>
              <ul className="text-text-secondary text-sm space-y-1">
                <li>• Ensure good lighting on your face</li>
                <li>• Remove sunglasses, hats, or face coverings</li>
                <li>• Look directly at the camera</li>
                <li>• Keep your face centered in the frame</li>
                <li>• Use a high-quality camera if possible</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QualityValidator;