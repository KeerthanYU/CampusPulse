import React, { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';

// Simple mock AI response generator
const mockRespond = (msg) => {
  const lower = msg.toLowerCase();
  if (lower.includes('timetable')) return 'Your timetable is available under Academic > Timetable.';
  if (lower.includes('assignment')) return 'Open assignments are listed in the Assignments section.';
  if (lower.includes('event')) return 'Campus events are shown in the Events calendar.';
  return `I can help with that. (Mock reply to: "${msg}")`;
};

const ChatWindow = ({ placeholder = 'Ask CampusPulse anything…' }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [messages]);

  const send = async () => {
    if (!input.trim()) return;
    const txt = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: txt }]);
    setInput('');

    // mock bot typing
    setTimeout(() => {
      const reply = mockRespond(txt);
      setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    }, 600);
  };

  return (
    <div className="chat-window">
      <div className="chat-log" ref={ref}>
        {messages.map((m, i) => <MessageBubble key={i} sender={m.sender} text={m.text} />)}
        {messages.length === 0 && <div className="chat-empty muted">Welcome — ask about timetables, events, assignments.</div>}
      </div>

      <div className="chat-controls">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={placeholder}
          onKeyDown={e => { if (e.key === 'Enter') send(); }}
        />
        <button className="send-btn" onClick={send}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
