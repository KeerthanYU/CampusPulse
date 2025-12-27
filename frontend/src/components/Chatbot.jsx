import { useState } from "react";
import { getTimetableForDay } from "../services/timetableService";
import { isTimetableQuestion, extractDay } from "../utils/intentDetector";
import { getNextClass, getCurrentDay } from "../utils/timeUtils";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");

  const handleSend = async () => {
    if (!userMessage.trim()) return;

    // Show user message immediately
    setMessages(prev => [...prev, { sender: "user", text: userMessage }]);

    let botMessage = "Sorry, I didn't understand that.";

    if (isTimetableQuestion(userMessage)) {
      // Extract day from message or fallback to today
      const day = extractDay(userMessage) || getCurrentDay();

      // optional class id from localStorage (e.g., saved user class), fallback to 'all'
      const classId = (() => {
        try { return localStorage.getItem('cp_classId') || 'all'; } catch (e) { return 'all'; }
      })();

      // indicate loading to user
      setMessages(prev => [...prev, { sender: 'bot', text: `⏳ Fetching timetable for ${day}...` }]);

      try {
        const timetableData = await getTimetableForDay(day, classId);

        // remove the loading message we just added
        setMessages(prev => prev.slice(0, -1));

        if (userMessage.toLowerCase().includes("next class")) {
          const nextClass = getNextClass(timetableData);
          if (nextClass) {
            botMessage = `⏱️ Your next class on ${day}:\n`;
            botMessage += `${nextClass.startTime} - ${nextClass.endTime}\n`;
            botMessage += `📘 Subject: ${nextClass.subject}\n`;
            botMessage += `👩‍🏫 Faculty: ${nextClass.facultyName}\n`;
            botMessage += `🏫 Room: ${nextClass.room}\n`;
          } else {
            botMessage = `You have no more classes scheduled for ${day}.`;
          }
        } else {
          // Show full timetable
          if (timetableData.length > 0) {
            botMessage = `📅 ${day} Timetable:\n\n`;
            timetableData.forEach((entry, i) => {
              botMessage += `${i + 1}️⃣ ${entry.startTime} - ${entry.endTime}\n`;
              botMessage += `📘 Subject: ${entry.subject}\n`;
              botMessage += `👩‍🏫 Faculty: ${entry.facultyName}\n`;
              botMessage += `🏫 Room: ${entry.room}\n\n`;
            });
          } else {
            botMessage = `No classes scheduled for ${day}.`;
          }
        }
      } catch (err) {
        console.error('Timetable fetch error', err);
        botMessage = `⚠️ Unable to fetch timetable for ${day} right now.`;
      }
    }

    setMessages(prev => [...prev, { sender: "bot", text: botMessage }]);
    setUserMessage("");
  };

  return (
    <div>
      <div className="chat-window">
        {messages.map((msg, idx) => (
          <div key={idx} className={msg.sender}>
            {msg.text}
          </div>
        ))}
      </div>
      <input
        value={userMessage}
        onChange={e => setUserMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default Chatbot;
