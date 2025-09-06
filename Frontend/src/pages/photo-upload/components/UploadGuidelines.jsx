import React from 'react';
import Icon from '../../../components/AppIcon';

const UploadGuidelines = () => {
  const guidelines = [
    {
      icon: 'Sun',
      title: 'Good Lighting',
      description: 'Use natural light or well-lit environments for clear facial features',
      color: 'text-amber-500'
    },
    {
      icon: 'User',
      title: 'Face Centered',
      description: 'Position your face in the center with shoulders visible',
      color: 'text-blue-500'
    },
    {
      icon: 'Eye',
      title: 'Clear Visibility',
      description: 'Remove sunglasses, hats, or anything covering your face',
      color: 'text-green-500'
    },
    {
      icon: 'Camera',
      title: 'Front Facing',
      description: 'Look directly at the camera with a neutral expression',
      color: 'text-purple-500'
    },
    {
      icon: 'Zap',
      title: 'High Quality',
      description: 'Use a high-resolution image for better matching accuracy',
      color: 'text-pink-500'
    },
    {
      icon: 'Shield',
      title: 'Privacy Safe',
      description: 'Your photos are processed securely and never shared publicly',
      color: 'text-emerald-500'
    }
  ];

  const tips = [
    'Avoid blurry or pixelated images',
    'Don\'t use heavily filtered or edited photos',
    'Ensure your face takes up at least 30% of the image',
    'Use recent photos for accurate matching'
  ];

  return (
    <div className="space-y-6">
      {/* Guidelines Header */}
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold text-text-primary">Photo Guidelines</h3>
        <p className="text-text-secondary">Follow these tips for the best matching results</p>
      </div>
      {/* Guidelines Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {guidelines?.map((guideline, index) => (
          <div
            key={index}
            className="bg-surface border border-border rounded-lg p-4 hover:shadow-elevation-2 transition-shadow duration-200"
          >
            <div className="flex items-start space-x-3">
              <div className={`flex-shrink-0 ${guideline?.color}`}>
                <Icon name={guideline?.icon} size={20} strokeWidth={2} />
              </div>
              <div className="space-y-1">
                <h4 className="font-medium text-text-primary text-sm">{guideline?.title}</h4>
                <p className="text-text-secondary text-xs leading-relaxed">
                  {guideline?.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Additional Tips */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 text-primary">
            <Icon name="Lightbulb" size={20} strokeWidth={2} />
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-text-primary text-sm">Pro Tips</h4>
            <ul className="space-y-1">
              {tips?.map((tip, index) => (
                <li key={index} className="text-text-secondary text-xs flex items-start space-x-2">
                  <Icon name="Check" size={12} className="text-primary mt-0.5 flex-shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* Example Images */}
      <div className="space-y-3">
        <h4 className="font-medium text-text-primary text-center">Example Photos</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="aspect-square bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center border-2 border-success">
              <div className="text-center space-y-2">
                <Icon name="CheckCircle" size={24} className="text-success mx-auto" />
                <span className="text-xs font-medium text-success">Good Example</span>
              </div>
            </div>
            <ul className="text-xs text-text-secondary space-y-1">
              <li className="flex items-center space-x-1">
                <Icon name="Check" size={10} className="text-success" />
                <span>Well-lit face</span>
              </li>
              <li className="flex items-center space-x-1">
                <Icon name="Check" size={10} className="text-success" />
                <span>Centered position</span>
              </li>
              <li className="flex items-center space-x-1">
                <Icon name="Check" size={10} className="text-success" />
                <span>Clear features</span>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <div className="aspect-square bg-gradient-to-br from-red-100 to-red-200 rounded-lg flex items-center justify-center border-2 border-error">
              <div className="text-center space-y-2">
                <Icon name="XCircle" size={24} className="text-error mx-auto" />
                <span className="text-xs font-medium text-error">Avoid This</span>
              </div>
            </div>
            <ul className="text-xs text-text-secondary space-y-1">
              <li className="flex items-center space-x-1">
                <Icon name="X" size={10} className="text-error" />
                <span>Dark/blurry</span>
              </li>
              <li className="flex items-center space-x-1">
                <Icon name="X" size={10} className="text-error" />
                <span>Face covered</span>
              </li>
              <li className="flex items-center space-x-1">
                <Icon name="X" size={10} className="text-error" />
                <span>Side angle</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadGuidelines;