import React, { useEffect, useRef, useState } from 'react';
import MessageBubble from './MessageBubble';
import Icon from '../../../components/AppIcon';

const ConversationArea = ({ messages, currentUserId, isLoading = false, onLoadMore }) => {
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToBottom = (smooth = true) => {
    messagesEndRef?.current?.scrollIntoView({ 
      behavior: smooth ? 'smooth' : 'auto' 
    });
  };

  const handleScroll = () => {
    const container = containerRef?.current;
    if (container) {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowScrollButton(!isNearBottom);

      // Load more messages when scrolled to top
      if (scrollTop === 0 && onLoadMore) {
        onLoadMore();
      }
    }
  };

  const groupMessages = (messages) => {
    const grouped = [];
    let currentGroup = [];
    let lastSenderId = null;
    let lastTimestamp = null;

    messages?.forEach((message, index) => {
      const timeDiff = lastTimestamp ? 
        (new Date(message.timestamp) - new Date(lastTimestamp)) / (1000 * 60) : 0;
      
      // Group messages from same sender within 5 minutes
      if (message?.senderId === lastSenderId && timeDiff < 5) {
        currentGroup?.push({ ...message, showAvatar: false, isLastInGroup: false });
      } else {
        if (currentGroup?.length > 0) {
          currentGroup[currentGroup.length - 1].isLastInGroup = true;
          grouped?.push(...currentGroup);
        }
        currentGroup = [{ ...message, showAvatar: true, isLastInGroup: true }];
      }

      lastSenderId = message?.senderId;
      lastTimestamp = message?.timestamp;

      // Handle last message
      if (index === messages?.length - 1) {
        currentGroup[currentGroup.length - 1].isLastInGroup = true;
        grouped?.push(...currentGroup);
      }
    });

    return grouped;
  };

  const addDateSeparators = (messages) => {
    const withSeparators = [];
    let lastDate = null;

    messages?.forEach((message) => {
      const messageDate = new Date(message.timestamp)?.toDateString();
      
      if (messageDate !== lastDate) {
        withSeparators?.push({
          type: 'date-separator',
          id: `date-${messageDate}`,
          date: messageDate,
          timestamp: message?.timestamp
        });
        lastDate = messageDate;
      }
      
      withSeparators?.push(message);
    });

    return withSeparators;
  };

  const formatDateSeparator = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday?.setDate(yesterday?.getDate() - 1);

    if (date?.toDateString() === today?.toDateString()) {
      return 'Today';
    } else if (date?.toDateString() === yesterday?.toDateString()) {
      return 'Yesterday';
    } else {
      return date?.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
  };

  useEffect(() => {
    scrollToBottom(false);
  }, []);

  useEffect(() => {
    const container = containerRef?.current;
    if (container) {
      const wasAtBottom = container?.scrollHeight - container?.scrollTop - container?.clientHeight < 100;
      if (wasAtBottom) {
        scrollToBottom();
      }
    }
  }, [messages]);

  const groupedMessages = groupMessages(messages);
  const messagesWithSeparators = addDateSeparators(groupedMessages);

  return (
    <div className="flex-1 relative bg-background">
      {/* Messages Container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-full overflow-y-auto px-4 py-6 space-y-1"
        style={{ scrollBehavior: 'smooth' }}
      >
        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex justify-center py-4">
            <div className="flex items-center space-x-2 text-text-secondary">
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span className="text-sm">Loading messages...</span>
            </div>
          </div>
        )}

        {/* Empty State */}
        {messages?.length === 0 && !isLoading && (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Icon name="MessageCircle" size={32} color="var(--color-text-secondary)" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              Start your conversation
            </h3>
            <p className="text-text-secondary max-w-sm">
              Send a message to begin chatting with your twin match. Break the ice and discover your similarities!
            </p>
          </div>
        )}

        {/* Messages */}
        {messagesWithSeparators?.map((item) => {
          if (item?.type === 'date-separator') {
            return (
              <div key={item?.id} className="flex justify-center py-4">
                <div className="bg-muted px-3 py-1 rounded-full">
                  <span className="text-xs font-medium text-text-secondary">
                    {formatDateSeparator(item?.date)}
                  </span>
                </div>
              </div>
            );
          }

          return (
            <MessageBubble
              key={item?.id}
              message={item}
              isOwn={item?.senderId === currentUserId}
              showAvatar={item?.showAvatar}
              isLastInGroup={item?.isLastInGroup}
            />
          );
        })}

        {/* Scroll anchor */}
        <div ref={messagesEndRef} />
      </div>
      {/* Scroll to Bottom Button */}
      {showScrollButton && (
        <button
          onClick={() => scrollToBottom()}
          className="absolute bottom-4 right-4 w-10 h-10 bg-primary text-primary-foreground rounded-full shadow-elevation-3 flex items-center justify-center hover:scale-105 transition-transform duration-200 z-10"
          aria-label="Scroll to bottom"
        >
          <Icon name="ChevronDown" size={20} />
        </button>
      )}
    </div>
  );
};

export default ConversationArea;