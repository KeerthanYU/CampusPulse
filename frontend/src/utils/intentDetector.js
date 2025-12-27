/**
 * Detect if user is asking about timetable
 */
export const isTimetableQuestion = (text) => {
  return /timetable|schedule|class.*timing|what.*class|when.*class/i.test(text);
};

/**
 * Extract day from text
 * Examples: "Monday", "tomorrow", "next tuesday"
 */
export const extractDay = (text) => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const lowerText = text.toLowerCase();

  // Handle relative dates
  if (/(today|today's)/i.test(text)) {
    const today = new Date();
    return days[today.getDay()];
  }

  if (/(tomorrow|tomorrow's)/i.test(text)) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return days[tomorrow.getDay()];
  }

  // Find exact day match
  const found = days.find(day => new RegExp(`\\b${day}\\b`, "i").test(text));
  return found || null;
};

/**
 * Extract class/section identifier from text
 * Examples: "CSE 3 B", "CSE3B", "B.Tech CSE 3rd sem B section"
 * Returns normalized format like "CSE 3 B"
 */
export const extractClass = (text) => {
  // Match patterns like "CSE 3 B", "CSE3B", "cse-3-b", etc.
  const patterns = [
    /([A-Z]+)\s*(\d+)\s*([A-Z])/i,           // "CSE 3 B" or "CSE3B"
    /([A-Z]+)-(\d+)-([A-Z])/i,               // "CSE-3-B"
    /section\s*([A-Z])/i,                     // "section B" (if class is known)
    /class\s*([A-Z]+)\s*(\d+)\s*([A-Z])/i   // "class CSE 3 B"
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      // Return normalized format: "DEPT SEM SECTION"
      if (match.length === 4) {
        return `${match[1].toUpperCase()} ${match[2]} ${match[3].toUpperCase()}`;
      } else if (match.length === 2) {
        // Just section, would need context
        return null;
      }
    }
  }

  return null;
};

/**
 * Extract search terms for events/assignments
 */
export const extractSearchTerm = (text) => {
  const match = text.match(/(?:about|for|on)\s+"?([^"]+)"?/i);
  return match ? match[1].trim() : null;
};

/**
 * Parse user message and return structured intent object
 */
export const parseIntent = (message) => {
  const intent = {
    type: null,
    day: null,
    class: null,
    searchTerm: null,
    raw: message
  };

  if (isTimetableQuestion(message)) {
    intent.type = 'timetable';
    intent.day = extractDay(message);
    intent.class = extractClass(message);
  }

  if (/event|happening|upcoming/i.test(message)) {
    intent.type = 'event';
    intent.searchTerm = extractSearchTerm(message);
  }

  if (/assignment|homework|submit/i.test(message)) {
    intent.type = 'assignment';
    intent.searchTerm = extractSearchTerm(message);
  }

  if (/exam|test|quiz/i.test(message)) {
    intent.type = 'exam';
    intent.searchTerm = extractSearchTerm(message);
  }

  return intent;
};

export default {
  isTimetableQuestion,
  extractDay,
  extractClass,
  extractSearchTerm,
  parseIntent
};
