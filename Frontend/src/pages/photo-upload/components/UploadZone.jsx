import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UploadZone = ({ onFileSelect, selectedFile, isUploading }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
    
    const files = e?.dataTransfer?.files;
    if (files?.length > 0) {
      handleFileSelection(files?.[0]);
    }
  };

  const handleFileSelection = (file) => {
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes?.includes(file?.type)) {
      alert('Please select a valid image file (JPEG, PNG, or WebP)');
      return;
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file?.size > maxSize) {
      alert('File size must be less than 10MB');
      return;
    }

    onFileSelect(file);
  };

  const handleFileInputChange = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      handleFileSelection(file);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef?.current?.click();
  };

  const handleCameraCapture = () => {
    // For mobile camera capture
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'user';
    input.onchange = (e) => {
      const file = e?.target?.files?.[0];
      if (file) {
        handleFileSelection(file);
      }
    };
    input?.click();
  };

  return (
    <div className="w-full">
      <div
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300
          ${isDragOver 
            ? 'border-primary bg-primary/5 scale-105' 
            : selectedFile 
              ? 'border-success bg-success/5' :'border-border bg-muted/30 hover:border-primary/50 hover:bg-primary/5'
          }
          ${isUploading ? 'pointer-events-none opacity-60' : 'cursor-pointer'}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={!selectedFile ? handleBrowseClick : undefined}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleFileInputChange}
          className="hidden"
        />

        {!selectedFile ? (
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className={`
                w-20 h-20 rounded-full flex items-center justify-center transition-colors duration-300
                ${isDragOver ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'}
              `}>
                <Icon name="Upload" size={32} strokeWidth={2} />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-text-primary">
                {isDragOver ? 'Drop your photo here' : 'Upload Your Photo'}
              </h3>
              <p className="text-text-secondary max-w-md mx-auto">
                Drag and drop your image here, or click to browse files
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Button
                variant="default"
                iconName="FolderOpen"
                iconPosition="left"
                onClick={handleBrowseClick}
                disabled={isUploading}
              >
                Browse Files
              </Button>

              <div className="block sm:hidden">
                <Button
                  variant="outline"
                  iconName="Camera"
                  iconPosition="left"
                  onClick={handleCameraCapture}
                  disabled={isUploading}
                >
                  Take Photo
                </Button>
              </div>
            </div>

            <div className="text-xs text-text-secondary space-y-1">
              <p>Supported formats: JPEG, PNG, WebP</p>
              <p>Maximum file size: 10MB</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-success/10 text-success flex items-center justify-center">
                <Icon name="CheckCircle" size={28} strokeWidth={2} />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-text-primary">Photo Selected</h3>
              <p className="text-text-secondary text-sm">{selectedFile?.name}</p>
              <p className="text-text-secondary text-xs">
                {(selectedFile?.size / (1024 * 1024))?.toFixed(2)} MB
              </p>
            </div>
          </div>
        )}

        {isUploading && (
          <div className="absolute inset-0 bg-surface/80 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <div className="text-center space-y-3">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-text-secondary font-medium">Processing your photo...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadZone;