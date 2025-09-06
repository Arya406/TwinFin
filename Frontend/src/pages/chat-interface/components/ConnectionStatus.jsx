import React from 'react';
import Icon from '../../../components/AppIcon';

const ConnectionStatus = ({ isConnected, isReconnecting, onRetry }) => {
  if (isConnected) return null;

  return (
    <div className="bg-warning/10 border-b border-warning/20 px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon 
            name={isReconnecting ? "Loader2" : "WifiOff"} 
            size={16} 
            color="var(--color-warning)"
            className={isReconnecting ? "animate-spin" : ""}
          />
          <span className="text-sm font-medium text-warning">
            {isReconnecting ? 'Reconnecting...' : 'Connection lost'}
          </span>
        </div>
        
        {!isReconnecting && onRetry && (
          <button
            onClick={onRetry}
            className="text-sm font-medium text-warning hover:text-warning/80 transition-colors duration-200"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
};

export default ConnectionStatus;