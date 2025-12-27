/**
 * Backend Timetable Service
 * Fetches timetable from college data
 * Handles class context, day parsing, and formatting
 */

import { collegeData, findTimetable, resolveFacultyName } from '../data/collegeData.js';

/**
 * Get timetable for a class on a specific day
 * @param {string} classId - e.g., "CSE 3 B" or "CSE3B"
 * @param {string} day - e.g., "Monday" or "monday"
 * @returns {object} { success, data, error }
 */
export const getTimetableByClassAndDay = (classId, day) => {
  try {
    if (!classId || !day) {
      return { success: false, error: 'Class and day are required' };
    }

    // Normalize inputs
    const normalizedClass = classId.trim().toUpperCase().replace(/\s+/g, ' ');
    const normalizedDay = day.trim().charAt(0).toUpperCase() + day.trim().slice(1).toLowerCase();

    // Find timetable
    const timetable = findTimetable(normalizedClass, normalizedDay);

    if (timetable === null) {
      return { success: false, error: `No timetable found for class ${normalizedClass}` };
    }

    if (timetable.length === 0) {
      return { 
        success: true, 
        data: {
          class: normalizedClass,
          day: normalizedDay,
          entries: [],
          message: `No classes scheduled for ${normalizedDay}`
        }
      };
    }

    // Enrich and format entries
    const enrichedEntries = timetable.map((entry, idx) => ({
      order: idx + 1,
      time: entry.time || 'Not specified',
      startTime: entry.time?.split('-')[0]?.trim() || 'N/A',
      endTime: entry.time?.split('-')[1]?.trim() || 'N/A',
      subject: entry.subject || 'Not specified',
      faculty: resolveFacultyName(entry.faculty),
      room: entry.room || 'TBD',
      type: entry.type || 'Lecture',
    }));

    return {
      success: true,
      data: {
        class: normalizedClass,
        day: normalizedDay,
        entries: enrichedEntries,
        count: enrichedEntries.length,
        lastUpdated: new Date().toISOString(),
      }
    };
  } catch (error) {
    console.error('getTimetableByClassAndDay error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get full timetable for a class (all days)
 */
export const getFullTimetable = (classId) => {
  try {
    const normalizedClass = classId.trim().toUpperCase().replace(/\s+/g, ' ');

    if (!collegeData.timetables[normalizedClass]) {
      return { success: false, error: `No timetable found for class ${normalizedClass}` };
    }

    const fullTimetable = collegeData.timetables[normalizedClass];
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const result = {
      class: normalizedClass,
      timetable: {}
    };

    days.forEach(day => {
      const entries = fullTimetable[day] || [];
      result.timetable[day] = entries.map((entry, idx) => ({
        order: idx + 1,
        time: entry.time,
        subject: entry.subject,
        faculty: resolveFacultyName(entry.faculty),
        room: entry.room,
        type: entry.type,
      }));
    });

    return { success: true, data: result };
  } catch (error) {
    console.error('getFullTimetable error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get next class for a student in their class
 */
export const getNextClassForDay = (classId) => {
  try {
    const normalizedClass = classId.trim().toUpperCase().replace(/\s+/g, ' ');
    const today = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const todayName = days[today.getDay()];

    // Get today's timetable
    const result = getTimetableByClassAndDay(normalizedClass, todayName);
    if (!result.success || result.data.entries.length === 0) {
      return { success: true, data: { nextClass: null, message: 'No classes today' } };
    }

    const now = new Date();
    const currentTime = now.getHours() * 100 + now.getMinutes();

    // Find next class
    const nextClass = result.data.entries.find(entry => {
      const startTime = parseInt(entry.startTime.replace(':', ''));
      return startTime > currentTime;
    });

    return {
      success: true,
      data: {
        nextClass: nextClass || null,
        message: nextClass ? `Your next class is ${nextClass.subject}` : 'No more classes today',
        currentTime: `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`,
      }
    };
  } catch (error) {
    console.error('getNextClassForDay error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Search for classes containing a subject
 */
export const searchTimetableBySubject = (subject) => {
  try {
    const results = [];
    const searchTerm = subject.toLowerCase();

    for (const [className, timetable] of Object.entries(collegeData.timetables)) {
      for (const [day, entries] of Object.entries(timetable)) {
        entries.forEach(entry => {
          if (entry.subject.toLowerCase().includes(searchTerm)) {
            results.push({
              class: className,
              day,
              subject: entry.subject,
              time: entry.time,
              faculty: entry.faculty,
              room: entry.room,
            });
          }
        });
      }
    }

    return { success: true, data: { results, count: results.length } };
  } catch (error) {
    console.error('searchTimetableBySubject error:', error);
    return { success: false, error: error.message };
  }
};

// Legacy export for compatibility
export const getToday = async () => {
  return [];
};

export default {
  getTimetableByClassAndDay,
  getFullTimetable,
  getNextClassForDay,
  searchTimetableBySubject,
};
