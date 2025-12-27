// utils/timeUtils.js

// Function to get the next class from a timetable array
export const getNextClass = (timetable) => {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  // Convert timetable times to minutes for easy comparison
  const upcoming = timetable
    .map(entry => {
      const [startHour, startMin] = entry.startTime.split(":").map(Number);
      const startTotal = startHour * 60 + startMin;
      return { ...entry, startTotal };
    })
    .filter(entry => entry.startTotal > currentMinutes) // future classes
    .sort((a, b) => a.startTotal - b.startTotal); // soonest first

  return upcoming.length > 0 ? upcoming[0] : null;
};

// Optional: helper to get today's day name
export const getCurrentDay = () => {
  return ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][new Date().getDay()];
};
