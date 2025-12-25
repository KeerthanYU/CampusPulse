import React from 'react';

// MessageBubble - simple presentational component for chat messages
const MessageBubble = ({ sender, text }) => {
  const isUser = sender === 'user';
  return (
    <div className={`message-bubble ${isUser ? 'user' : 'bot'}`}>
      <div className="message-text">{text}</div>
    </div>
  );
};

export default MessageBubble;
