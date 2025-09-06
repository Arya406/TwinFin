import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ChatHeader = ({ matchedUser, onBack }) => {
  return (
    <div className="bg-surface border-b border-border px-4 py-3 flex items-center space-x-3 shadow-elevation-1">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="p-2 hover:bg-muted rounded-lg transition-colors duration-200 touch-target md:hidden"
        aria-label="Go back to matches"
      >
        <Icon name="ArrowLeft" size={20} color="var(--color-text-primary)" />
      </button>
      {/* User Avatar */}
      <div className="relative">
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-border">
          <Image
            src={matchedUser?.avatar}
            alt={`${matchedUser?.name}'s profile`}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Online Status */}
        {matchedUser?.isOnline && (
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success border-2 border-surface rounded-full" />
        )}
      </div>
      {/* User Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-semibold text-text-primary truncate">
            {matchedUser?.name}
          </h2>
          <div className="flex items-center space-x-1 bg-primary/10 px-2 py-1 rounded-full">
            <Icon name="Zap" size={14} color="var(--color-primary)" />
            <span className="text-xs font-medium text-primary">
              {matchedUser?.similarityScore}% match
            </span>
          </div>
        </div>
        <p className="text-sm text-text-secondary">
          {matchedUser?.isOnline ? (
            matchedUser?.isTyping ? (
              <span className="flex items-center space-x-1">
                <span>typing</span>
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1 h-1 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1 h-1 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </span>
            ) : (
              'Online'
            )
          ) : (
            `Last seen ${matchedUser?.lastSeen}`
          )}
        </p>
      </div>
      {/* Action Buttons */}
      <div className="flex items-center space-x-2">
        <button
          className="p-2 hover:bg-muted rounded-lg transition-colors duration-200 touch-target"
          aria-label="Video call"
        >
          <Icon name="Video" size={20} color="var(--color-text-secondary)" />
        </button>
        <button
          className="p-2 hover:bg-muted rounded-lg transition-colors duration-200 touch-target"
          aria-label="Voice call"
        >
          <Icon name="Phone" size={20} color="var(--color-text-secondary)" />
        </button>
        <button
          className="p-2 hover:bg-muted rounded-lg transition-colors duration-200 touch-target"
          aria-label="More options"
        >
          <Icon name="MoreVertical" size={20} color="var(--color-text-secondary)" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;