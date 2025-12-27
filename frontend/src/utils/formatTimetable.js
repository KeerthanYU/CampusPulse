// src/utils/formatTimetable.js

export const formatTimetableResponse = (day, periods) => {
  if (!periods || periods.length === 0) {
    return `❌ No timetable found for ${day}.`;
  }

  let response = `📅 ${day} Timetable:\n\n`;

  periods.forEach((p, index) => {
    // Defensive: support either a combined `time` field or `start`/`end`
    const time = p?.time
      ? p.time
      : p?.start && p?.end
      ? `${p.start} - ${p.end}`
      : p?.start || 'Not available';

    const subject = p?.subject || 'Not available';
    const faculty = p?.faculty || p?.facultyName || 'Not available';
    const room = p?.room || 'Not available';

    response += `${index + 1}️⃣ ${time}\n`;
    response += `📘 Subject: ${subject}\n`;
    response += `👩‍🏫 Faculty: ${faculty}\n`;
    response += `🏫 Room: ${room}\n\n`;
  });

  return response;
};
