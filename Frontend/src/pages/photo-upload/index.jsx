import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../../components/ui/NavigationBar';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import UploadZone from './components/UploadZone';
import ImagePreview from './components/ImagePreview';
import UploadGuidelines from './components/UploadGuidelines';
import UploadProgress from './components/UploadProgress';
import QualityValidator from './components/QualityValidator';

const PhotoUpload = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState('upload'); // upload, preview, validate, progress, complete
  const [selectedFile, setSelectedFile] = useState(null);
  const [cropSettings, setCropSettings] = useState({ rotation: 0, zoom: 1 });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('uploading');
  const [validationResults, setValidationResults] = useState({});
  const [isValidating, setIsValidating] = useState(false);
  const [user] = useState({
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  });

  // Mock validation function
  const validateImage = async (file) => {
    setIsValidating(true);
    
    // Simulate validation process
    const checks = ['lighting', 'faceDetection', 'imageQuality', 'faceSize', 'faceAngle'];
    const results = {};
    
    for (let i = 0; i < checks?.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      // Mock validation results - mostly positive with some random failures
      results[checks[i]] = Math.random() > 0.2; // 80% pass rate
      setValidationResults({ ...results });
    }
    
    setIsValidating(false);
    return results;
  };

  // Mock upload function
  const uploadImage = async (file) => {
    setCurrentStep('progress');
    setUploadStatus('uploading');
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setUploadStatus('success');
          setTimeout(() => {
            navigate('/match-results');
          }, 2000);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 300);

    // Simulate processing stages
    setTimeout(() => setUploadStatus('processing'), 2000);
  };

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setCurrentStep('preview');
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setCropSettings({ rotation: 0, zoom: 1 });
    setCurrentStep('upload');
  };

  const handleCropChange = (settings) => {
    setCropSettings(settings);
  };

  const handleValidatePhoto = async () => {
    if (!selectedFile) return;
    
    setCurrentStep('validate');
    const results = await validateImage(selectedFile);
    setValidationResults(results);
  };

  const handleUploadPhoto = async () => {
    if (!selectedFile) return;
    await uploadImage(selectedFile);
  };

  const handleRetakePhoto = () => {
    handleRemoveFile();
    setValidationResults({});
  };

  const renderStepIndicator = () => {
    const steps = [
      { key: 'upload', label: 'Upload', icon: 'Upload' },
      { key: 'preview', label: 'Preview', icon: 'Eye' },
      { key: 'validate', label: 'Validate', icon: 'CheckCircle' },
      { key: 'progress', label: 'Process', icon: 'Zap' }
    ];

    const stepOrder = ['upload', 'preview', 'validate', 'progress'];
    const currentIndex = stepOrder?.indexOf(currentStep);

    return (
      <div className="flex items-center justify-center space-x-4 mb-8">
        {steps?.map((step, index) => {
          const isActive = step?.key === currentStep;
          const isCompleted = index < currentIndex;
          const isAccessible = index <= currentIndex;

          return (
            <div key={step?.key} className="flex items-center">
              <div
                className={`
                  flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200
                  ${isActive 
                    ? 'border-primary bg-primary text-primary-foreground' 
                    : isCompleted 
                      ? 'border-success bg-success text-success-foreground'
                      : isAccessible
                        ? 'border-primary/30 bg-primary/5 text-primary' :'border-border bg-muted text-text-secondary'
                  }
                `}
              >
                <Icon 
                  name={isCompleted ? 'Check' : step?.icon} 
                  size={16} 
                  strokeWidth={2}
                />
              </div>
              <span className={`
                ml-2 text-sm font-medium
                ${isActive ? 'text-primary' : isCompleted ? 'text-success' : 'text-text-secondary'}
              `}>
                {step?.label}
              </span>
              {index < steps?.length - 1 && (
                <div className={`
                  w-8 h-0.5 mx-4
                  ${index < currentIndex ? 'bg-success' : 'bg-border'}
                `} />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'upload':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <UploadZone
                onFileSelect={handleFileSelect}
                selectedFile={selectedFile}
                isUploading={false}
              />
              {selectedFile && (
                <div className="flex justify-center">
                  <Button
                    variant="default"
                    iconName="ArrowRight"
                    iconPosition="right"
                    onClick={() => setCurrentStep('preview')}
                  >
                    Continue to Preview
                  </Button>
                </div>
              )}
            </div>
            <div className="lg:pl-8">
              <UploadGuidelines />
            </div>
          </div>
        );

      case 'preview':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <ImagePreview
                file={selectedFile}
                onRemove={handleRemoveFile}
                onCropChange={handleCropChange}
              />
            </div>
            <div className="space-y-6">
              <UploadGuidelines />
              <div className="flex flex-col space-y-3">
                <Button
                  variant="default"
                  iconName="CheckCircle"
                  iconPosition="right"
                  onClick={handleValidatePhoto}
                  fullWidth
                >
                  Validate Photo Quality
                </Button>
                <Button
                  variant="outline"
                  iconName="Upload"
                  iconPosition="left"
                  onClick={handleRemoveFile}
                  fullWidth
                >
                  Choose Different Photo
                </Button>
              </div>
            </div>
          </div>
        );

      case 'validate':
        return (
          <div className="max-w-2xl mx-auto">
            <QualityValidator
              validationResults={validationResults}
              isValidating={isValidating}
              onRetake={handleRetakePhoto}
              onProceed={handleUploadPhoto}
            />
          </div>
        );

      case 'progress':
        return (
          <div className="max-w-md mx-auto">
            <UploadProgress
              progress={uploadProgress}
              status={uploadStatus}
              fileName={selectedFile?.name}
              estimatedTime={uploadProgress < 100 ? Math.ceil((100 - uploadProgress) / 10) : null}
              onCancel={() => {
                setCurrentStep('preview');
                setUploadProgress(0);
                setUploadStatus('uploading');
              }}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar user={user} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-8">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <Icon name="Upload" size={24} color="white" strokeWidth={2} />
            </div>
            <h1 className="text-3xl font-bold text-text-primary">Upload Your Photo</h1>
          </div>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Upload a clear photo of yourself to find your facial twins from around the world. 
            Our AI will analyze your features and match you with similar-looking people.
          </p>
        </div>

        {/* Step Indicator */}
        {renderStepIndicator()}

        {/* Main Content */}
        <div className="bg-surface rounded-2xl shadow-elevation-2 p-6 lg:p-8">
          {renderCurrentStep()}
        </div>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Icon name="HelpCircle" size={20} className="text-primary" />
              <span className="font-medium text-text-primary">Need Help?</span>
            </div>
            <p className="text-text-secondary text-sm">
              Having trouble uploading your photo? Check our{' '}
              <button className="text-primary hover:underline font-medium">
                photo guidelines
              </button>{' '}
              or{' '}
              <button className="text-primary hover:underline font-medium">
                contact support
              </button>{' '}
              for assistance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoUpload;