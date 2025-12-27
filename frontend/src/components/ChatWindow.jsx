import React, { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import { isTimetableQuestion, extractDay, extractClass, parseIntent } from '../utils/intentDetector';
import { getTimetableForDay } from '../services/timetableService';
import { getNextClass, getCurrentDay } from '../utils/timeUtils';
import { useAuth } from '../context/AuthContext';

const ChatWindow = ({ placeholder = 'Ask CampusPulse anything…' }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);
  const { studentClass, setClass } = useAuth();

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [messages]);

  const send = async () => {
    if (!input.trim()) return;
    const txt = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: txt }]);
    setInput('');
    setLoading(true);

    try {
      // Check if user is setting their class context
      if (/i am in|i'm in|my class|class is|studying/i.test(txt)) {
        const extracted = extractClass(txt);
        if (extracted) {
          setClass(txt);
          const reply = `✅ Got it! I've saved your class as **${extracted}**. Now I can give you personalized timetables and assignments.`;
          setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
          setLoading(false);
          return;
        }
      }

      // Parse intent from user message
      const intent = parseIntent(txt);

      // Handle timetable queries
      if (intent.type === 'timetable') {
        const day = intent.day || getCurrentDay();
        const classId = intent.class || studentClass || 'CSE 3 B'; // Default to CSE 3 B for demo

        setMessages(prev => [...prev, { sender: 'bot', text: `⏳ Fetching timetable for ${classId} on ${day}...` }]);

        const timetable = await getTimetableForDay(day, classId);

        // remove loading message
        setMessages(prev => prev.slice(0, -1));

        if (txt.toLowerCase().includes('next')) {
          const nextClass = getNextClass(timetable);
          if (nextClass) {
            const reply = `⏱️ Your next class on ${day}:\n${nextClass.startTime} - ${nextClass.endTime}\n📘 Subject: ${nextClass.subject}\n👩‍🏫 Faculty: ${nextClass.facultyName}\n🏫 Room: ${nextClass.room}`;
            setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
          } else {
            setMessages(prev => [...prev, { sender: 'bot', text: `You have no more classes scheduled for ${day}.` }]);
          }
        } else {
          if (timetable.length === 0) {
            setMessages(prev => [...prev, { sender: 'bot', text: `No classes scheduled for ${classId} on ${day}. Try another class or day.` }]);
          } else {
            const lines = [`📅 **${classId}** - ${day}`];
            lines.push('---');
            timetable.forEach((e, i) => {
              lines.push(`\n**Period ${i + 1}**`);
              lines.push(`⏰ ${e.startTime} - ${e.endTime}`);
              lines.push(`📘 ${e.subject}`);
              lines.push(`👩‍🏫 ${e.facultyName}`);
              lines.push(`🏫 ${e.room}`);
            });
            setMessages(prev => [...prev, { sender: 'bot', text: lines.join('\n') }]);
          }
        }

        setLoading(false);
        return;
      }

      // Handle event queries
      if (intent.type === 'event') {
        setMessages(prev => [...prev, { sender: 'bot', text: '📢 Upcoming events: Placements (Jan 25), Tech Fest (Feb 10), Hackathon (Feb 28), Expert Seminar (Mar 5)' }]);
        setLoading(false);
        return;
      }

      // Handle assignment queries
      if (intent.type === 'assignment') {
        setMessages(prev => [...prev, { sender: 'bot', text: '📝 Your assignments:\n1. Data Structures Project (Due: Jan 30)\n2. DBMS Queries (Due: Feb 5)\n3. AI Assignment (Due: Feb 12)\n4. Web Dev Project (Due: Feb 20)' }]);
        setLoading(false);
        return;
      }

      // Handle exam queries
      if (intent.type === 'exam') {
        setMessages(prev => [...prev, { sender: 'bot', text: '🧪 Exam Schedule:\n- Midterms: Feb 1-5\n- Practicals: Feb 10-20\n- Semester End: Apr 5-15' }]);
        setLoading(false);
        return;
      }

      // Default fallback
      const suggestions = [
        "Try asking about your timetable (e.g., 'Show me Monday's timetable')",
        "Ask about events (e.g., 'What events are coming up?')",
        "Ask about assignments (e.g., 'What assignments do I have?')",
        "You can also tell me your class (e.g., 'I'm in CSE 3 B')"
      ];
      const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
      setMessages(prev => [...prev, { sender: 'bot', text: `💡 ${randomSuggestion}` }]);

    } catch (err) {
      console.error('ChatWindow error', err);
      setMessages(prev => [...prev, { sender: 'bot', text: '⚠️ Unable to process your request right now. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-log" ref={ref}>
        {messages.map((m, i) => <MessageBubble key={i} sender={m.sender} text={m.text} />)}
        {messages.length === 0 && (
          <div className="chat-empty muted">
            👋 Welcome to CampusPulse! Ask about your timetable, events, or assignments.<br />
            {studentClass && <span>✅ Your class: <strong>{studentClass}</strong></span>}
          </div>
        )}
      </div>

      <div className="chat-controls">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={placeholder}
          disabled={loading}
          onKeyDown={e => { if (e.key === 'Enter' && !loading) send(); }}
        />
        <button className="send-btn" onClick={send} disabled={loading}>
          {loading ? '...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
