import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavigationBar from '../../components/ui/NavigationBar';
import ChatHeader from './components/ChatHeader';
import ConversationArea from './components/ConversationArea';
import MessageInput from './components/MessageInput';
import ConnectionStatus from './components/ConnectionStatus';

const ChatInterface = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Mock current user
  const currentUser = {
    id: "user-1",
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  };

  // Get matched user from navigation state or use default
  const defaultMatchedUser = {
    id: "user-2",
    name: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    similarityScore: 87,
    isOnline: true,
    isTyping: false,
    lastSeen: "2 minutes ago"
  };

  const [matchedUser, setMatchedUser] = useState(
    location?.state?.matchedUser || defaultMatchedUser
  );
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(true);
  const [isReconnecting, setIsReconnecting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock messages data
  const mockMessages = [
    {
      id: "msg-1",
      senderId: "user-2",
      senderName: "Sarah Chen",
      senderAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content: "Hi! I can\'t believe how similar we look! This is amazing! 😊",
      type: "text",
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      status: "read"
    },
    {
      id: "msg-2",
      senderId: "user-1",
      senderName: "Alex Johnson",
      senderAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: "I know right! When I saw your photo, I thought it was me for a second 😂",
      type: "text",
      timestamp: new Date(Date.now() - 3540000), // 59 minutes ago
      status: "read"
    },
    {
      id: "msg-3",
      senderId: "user-2",
      senderName: "Sarah Chen",
      senderAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content: "Where are you from? I\'m from San Francisco. Maybe we\'re related somehow! 🤔",
      type: "text",
      timestamp: new Date(Date.now() - 3480000), // 58 minutes ago
      status: "read"
    },
    {
      id: "msg-4",
      senderId: "user-1",
      senderName: "Alex Johnson",
      senderAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: "I'm from Seattle! That's not too far. My family has some roots in California too.\n\nWhat do you do for work?",
      type: "text",
      timestamp: new Date(Date.now() - 3420000), // 57 minutes ago
      status: "read"
    },
    {
      id: "msg-5",
      senderId: "user-2",
      senderName: "Sarah Chen",
      senderAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content: "I\'m a graphic designer! I love creating visual content and working with brands. What about you?",
      type: "text",
      timestamp: new Date(Date.now() - 3360000), // 56 minutes ago
      status: "read"
    },
    {
      id: "msg-6",
      senderId: "user-1",
      senderName: "Alex Johnson",
      senderAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: "That\'s so cool! I\'m a software developer. I work mostly on web applications.",
      type: "text",
      timestamp: new Date(Date.now() - 3300000), // 55 minutes ago
      status: "read"
    },
    {
      id: "msg-7",
      senderId: "user-2",
      senderName: "Sarah Chen",
      senderAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content: "We should definitely meet up sometime! It would be so interesting to meet my \'twin\' in person 😄",
      type: "text",
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      status: "read"
    },
    {
      id: "msg-8",
      senderId: "user-1",
      senderName: "Alex Johnson",
      senderAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: "Absolutely! I\'d love to meet up. Maybe we can grab coffee next weekend?",
      type: "text",
      timestamp: new Date(Date.now() - 1740000), // 29 minutes ago
      status: "read"
    },
    {
      id: "msg-9",
      senderId: "user-2",
      senderName: "Sarah Chen",
      senderAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content: "Perfect! I know a great coffee shop in downtown. I'll send you the details.",
      type: "text",
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      status: "read"
    },
    {
      id: "msg-10",
      senderId: "user-1",
      senderName: "Alex Johnson",
      senderAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: "Sounds great! Looking forward to it 🎉",
      type: "text",
      timestamp: new Date(Date.now() - 240000), // 4 minutes ago
      status: "delivered"
    }
  ];

  // Initialize messages
  useEffect(() => {
    setIsLoading(true);
    // Simulate loading delay
    const timer = setTimeout(() => {
      setMessages(mockMessages);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Simulate typing indicator
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) { // 20% chance to show typing
        setMatchedUser(prev => ({ ...prev, isTyping: true }));
        setTimeout(() => {
          setMatchedUser(prev => ({ ...prev, isTyping: false }));
        }, 2000);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Simulate connection status changes
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.95) { // 5% chance to lose connection
        setIsConnected(false);
        setIsReconnecting(true);
        
        setTimeout(() => {
          setIsReconnecting(false);
          setIsConnected(true);
        }, 3000);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = useCallback((messageData) => {
    const newMessage = {
      id: `msg-${Date.now()}`,
      senderId: currentUser?.id,
      senderName: currentUser?.name,
      senderAvatar: currentUser?.avatar,
      content: messageData?.content,
      type: messageData?.type || 'text',
      timestamp: messageData?.timestamp || new Date(),
      status: 'sending'
    };

    setMessages(prev => [...prev, newMessage]);

    // Simulate message status updates
    setTimeout(() => {
      setMessages(prev => 
        prev?.map(msg => 
          msg?.id === newMessage?.id 
            ? { ...msg, status: 'sent' }
            : msg
        )
      );
    }, 500);

    setTimeout(() => {
      setMessages(prev => 
        prev?.map(msg => 
          msg?.id === newMessage?.id 
            ? { ...msg, status: 'delivered' }
            : msg
        )
      );
    }, 1000);

    setTimeout(() => {
      setMessages(prev => 
        prev?.map(msg => 
          msg?.id === newMessage?.id 
            ? { ...msg, status: 'read' }
            : msg
        )
      );
    }, 2000);

    // Simulate auto-reply (30% chance)
    if (Math.random() > 0.7) {
      const autoReplies = [
        "That\'s interesting! Tell me more 😊",
        "I totally agree with you!",
        "Haha, that's so funny! 😂",
        "Really? That\'s amazing!",
        "I was just thinking the same thing!",
        "You\'re so right about that 👍"
      ];

      setTimeout(() => {
        const replyMessage = {
          id: `msg-${Date.now()}-reply`,
          senderId: matchedUser?.id,
          senderName: matchedUser?.name,
          senderAvatar: matchedUser?.avatar,
          content: autoReplies?.[Math.floor(Math.random() * autoReplies?.length)],
          type: 'text',
          timestamp: new Date(),
          status: 'read'
        };

        setMessages(prev => [...prev, replyMessage]);
      }, 3000 + Math.random() * 2000);
    }
  }, [currentUser, matchedUser]);

  const handleBack = () => {
    navigate('/match-results');
  };

  const handleRetryConnection = () => {
    setIsReconnecting(true);
    setTimeout(() => {
      setIsReconnecting(false);
      setIsConnected(true);
    }, 2000);
  };

  const handleLoadMore = () => {
    // Simulate loading more messages
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar user={currentUser} notificationCount={3} />
      <div className="flex flex-col h-screen pt-16">
        {/* Connection Status */}
        <ConnectionStatus 
          isConnected={isConnected}
          isReconnecting={isReconnecting}
          onRetry={handleRetryConnection}
        />

        {/* Chat Header */}
        <ChatHeader 
          matchedUser={matchedUser}
          onBack={handleBack}
        />

        {/* Conversation Area */}
        <ConversationArea
          messages={messages}
          currentUserId={currentUser?.id}
          isLoading={isLoading}
          onLoadMore={handleLoadMore}
        />

        {/* Message Input */}
        <MessageInput
          onSendMessage={handleSendMessage}
          disabled={!isConnected}
          placeholder={
            isConnected 
              ? "Type a message..." :"Reconnecting..."
          }
        />
      </div>
    </div>
  );
};

export default ChatInterface;