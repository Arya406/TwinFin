import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MessageInput = ({ onSendMessage, disabled = false, placeholder = "Type a message..." }) => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  const commonEmojis = ['😊', '😂', '❤️', '👍', '👎', '😢', '😮', '😡', '🎉', '🔥', '💯', '🙌'];

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (message?.trim() && !disabled) {
      onSendMessage({
        content: message?.trim(),
        type: 'text',
        timestamp: new Date()
      });
      setMessage('');
      adjustTextareaHeight();
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSubmit(e);
    }
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef?.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const newHeight = Math.min(textarea?.scrollHeight, 120); // Max 120px height
      textarea.style.height = `${newHeight}px`;
    }
  };

  const handleEmojiClick = (emoji) => {
    setMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
    textareaRef?.current?.focus();
  };

  const handleFileSelect = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      // Handle file upload
      onSendMessage({
        content: `Shared a file: ${file?.name}`,
        type: 'file',
        fileName: file?.name,
        fileSize: file?.size,
        timestamp: new Date()
      });
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  return (
    <div className="bg-surface border-t border-border p-4">
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        {/* Attachment Button */}
        <button
          type="button"
          onClick={() => fileInputRef?.current?.click()}
          className="p-2 text-text-secondary hover:text-text-primary hover:bg-muted rounded-lg transition-colors duration-200 touch-target flex-shrink-0"
          aria-label="Attach file"
        >
          <Icon name="Paperclip" size={20} />
        </button>

        {/* Message Input Container */}
        <div className="flex-1 relative">
          <div className="flex items-end bg-muted rounded-2xl border border-border focus-within:border-primary transition-colors duration-200">
            {/* Text Input */}
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e?.target?.value)}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              disabled={disabled}
              rows={1}
              className="flex-1 bg-transparent px-4 py-3 text-sm text-text-primary placeholder-text-secondary resize-none outline-none min-h-[44px] max-h-[120px]"
              style={{ lineHeight: '1.5' }}
            />

            {/* Emoji Button */}
            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="p-2 text-text-secondary hover:text-text-primary transition-colors duration-200 flex-shrink-0"
              aria-label="Add emoji"
            >
              <Icon name="Smile" size={20} />
            </button>
          </div>

          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div className="absolute bottom-full right-0 mb-2 bg-surface border border-border rounded-lg shadow-elevation-3 p-3 z-10">
              <div className="grid grid-cols-6 gap-2">
                {commonEmojis?.map((emoji, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleEmojiClick(emoji)}
                    className="w-8 h-8 flex items-center justify-center hover:bg-muted rounded transition-colors duration-200 text-lg"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Send Button */}
        <Button
          type="submit"
          variant="default"
          size="icon"
          disabled={!message?.trim() || disabled}
          className="flex-shrink-0 touch-target"
          aria-label="Send message"
        >
          <Icon name="Send" size={18} />
        </Button>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          className="hidden"
          accept="image/*,.pdf,.doc,.docx,.txt"
        />
      </form>
    </div>
  );
};

export default MessageInput;