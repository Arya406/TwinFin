import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const MessageBubble = ({ message, isOwn, showAvatar = true, isLastInGroup = true }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp)?.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'sending':
        return <Icon name="Clock" size={12} color="var(--color-text-secondary)" />;
      case 'sent':
        return <Icon name="Check" size={12} color="var(--color-text-secondary)" />;
      case 'delivered':
        return <Icon name="CheckCheck" size={12} color="var(--color-text-secondary)" />;
      case 'read':
        return <Icon name="CheckCheck" size={12} color="var(--color-primary)" />;
      case 'failed':
        return <Icon name="AlertCircle" size={12} color="var(--color-error)" />;
      default:
        return null;
    }
  };

  return (
    <div className={`flex items-end space-x-2 mb-4 ${isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
      {/* Avatar */}
      {showAvatar && !isOwn && (
        <div className="w-8 h-8 rounded-full overflow-hidden border border-border flex-shrink-0">
          <Image
            src={message?.senderAvatar}
            alt={`${message?.senderName}'s avatar`}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      {showAvatar && isOwn && <div className="w-8" />}
      {/* Message Content */}
      <div className={`max-w-xs lg:max-w-md ${isOwn ? 'items-end' : 'items-start'} flex flex-col`}>
        {/* Message Bubble */}
        <div
          className={`
            px-4 py-2 rounded-2xl shadow-elevation-1 relative
            ${isOwn 
              ? 'bg-primary text-primary-foreground rounded-br-md' 
              : 'bg-surface text-text-primary border border-border rounded-bl-md'
            }
          `}
        >
          {/* Message Text */}
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
            {message?.content}
          </p>

          {/* Message Type Indicators */}
          {message?.type === 'image' && (
            <div className="mt-2 rounded-lg overflow-hidden">
              <Image
                src={message?.imageUrl}
                alt="Shared image"
                className="max-w-full h-auto"
              />
            </div>
          )}

          {message?.type === 'file' && (
            <div className="mt-2 flex items-center space-x-2 p-2 bg-muted rounded-lg">
              <Icon name="File" size={16} color="var(--color-text-secondary)" />
              <span className="text-xs text-text-secondary truncate">
                {message?.fileName}
              </span>
            </div>
          )}
        </div>

        {/* Message Info */}
        {isLastInGroup && (
          <div className={`flex items-center space-x-1 mt-1 px-1 ${isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <span className="text-xs text-text-secondary">
              {formatTime(message?.timestamp)}
            </span>
            {isOwn && (
              <div className="flex items-center">
                {getStatusIcon(message?.status)}
              </div>
            )}
          </div>
        )}
      </div>
      {/* Spacer for alignment */}
      {!showAvatar && !isOwn && <div className="w-8" />}
    </div>
  );
};

export default MessageBubble;