import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MatchCard = ({ match, userPhoto, onStartChat }) => {
  const getScoreColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 75) return 'text-warning';
    return 'text-error';
  };

  const getScoreBackground = (score) => {
    if (score >= 90) return 'bg-success/10 border-success/20';
    if (score >= 75) return 'bg-warning/10 border-warning/20';
    return 'bg-error/10 border-error/20';
  };

  return (
    <div className="bg-card rounded-xl shadow-elevation-2 p-6 hover:shadow-elevation-3 transition-all duration-300 hover-lift">
      {/* Similarity Score Badge */}
      <div className="flex justify-between items-start mb-4">
        <div className={`px-3 py-1 rounded-full border ${getScoreBackground(match?.similarityScore)}`}>
          <span className={`text-sm font-semibold ${getScoreColor(match?.similarityScore)}`}>
            {match?.similarityScore}% Match
          </span>
        </div>
        <div className="flex items-center text-text-secondary text-sm">
          <Icon name="MapPin" size={14} className="mr-1" />
          <span>{match?.location}</span>
        </div>
      </div>
      {/* Photo Comparison */}
      <div className="flex items-center justify-center space-x-4 mb-6">
        {/* User's Photo */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-border">
            <Image
              src={userPhoto}
              alt="Your photo"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xs text-text-secondary mt-2">You</span>
        </div>

        {/* VS Indicator */}
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
            <Icon name="ArrowLeftRight" size={16} color="var(--color-text-secondary)" />
          </div>
        </div>

        {/* Match's Photo */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-border">
            <Image
              src={match?.photo}
              alt={`${match?.name}'s photo`}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xs text-text-secondary mt-2">Twin</span>
        </div>
      </div>
      {/* Match Information */}
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-text-primary mb-1">{match?.name}</h3>
        <p className="text-sm text-text-secondary mb-2">{match?.age} years old</p>
        {match?.bio && (
          <p className="text-sm text-text-secondary line-clamp-2">{match?.bio}</p>
        )}
      </div>
      {/* Match Details */}
      <div className="flex justify-between items-center text-xs text-text-secondary mb-4">
        <div className="flex items-center">
          <Icon name="Clock" size={12} className="mr-1" />
          <span>Matched {match?.matchedAt}</span>
        </div>
        <div className="flex items-center">
          <Icon name="Users" size={12} className="mr-1" />
          <span>{match?.mutualConnections} mutual</span>
        </div>
      </div>
      {/* Action Button */}
      <Button
        variant="default"
        fullWidth
        iconName="MessageCircle"
        iconPosition="left"
        onClick={() => onStartChat(match)}
        className="touch-target"
      >
        Start Chat
      </Button>
    </div>
  );
};

export default MatchCard;