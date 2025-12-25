import React, { useState, useRef, useEffect } from 'react';
import { sendMessage } from '../services/api';

const Chat = () => {
	const [message, setMessage] = useState('');
	const [chatLog, setChatLog] = useState([]);
	const logRef = useRef(null);

	useEffect(() => {
		if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
	}, [chatLog]);

	const handleSend = async () => {
		if (!message.trim()) return;
		const userMsg = message.trim();
		setChatLog(prev => [...prev, { type: 'user', text: userMsg }]);
		setMessage('');
		let responseText = '';
		try {
			responseText = await sendMessage(userMsg);
		} catch (err) {
			responseText = 'Error: could not send message';
		}
		setChatLog(prev => [...prev, { type: 'bot', text: responseText }]);
	};

	return (
		<div className="chat-panel-content">
			<h3>Chat</h3>

			<div className="chat-log" ref={logRef}>
				{chatLog.map((entry, idx) => (
					<div key={idx} className={`chat-entry ${entry.type === 'user' ? 'user' : 'bot'}`}>
						{entry.type === 'user' ? <div><strong>You:</strong> {entry.text}</div> : <div><strong>Bot:</strong> {entry.text}</div>}
					</div>
				))}
			</div>

			<div className="input-row">
				<input
					type="text"
					value={message}
					onChange={e => setMessage(e.target.value)}
					placeholder="Ask CampusPulse..."
					onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
				/>
				<button onClick={handleSend}>Send</button>
			</div>
		</div>
	);
};

export default Chat;
