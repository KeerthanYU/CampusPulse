import { getTimetableByClassAndDay, getFullTimetable, getNextClassForDay, searchTimetableBySubject } from '../services/timetableService.js';

/**
 * Get timetable for a class on a specific day
 * GET /api/timetable?class=CSE%203%20B&day=Monday
 */
export const getTimetableByDay = (req, res, next) => {
  try {
    const { class: classId, day } = req.query;

    if (!classId || !day) {
      return res.status(400).json({
        success: false,
        error: 'Missing required parameters: class and day',
        example: '/api/timetable?class=CSE%203%20B&day=Monday'
      });
    }

    const result = getTimetableByClassAndDay(classId, day);

    if (!result.success) {
      return res.status(404).json(result);
    }

    res.json({ success: true, data: result.data });
  } catch (error) {
    console.error('getTimetableByDay error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Get full timetable for a class (all days)
 * GET /api/timetable/full?class=CSE%203%20B
 */
export const getFullWeekTimetable = (req, res, next) => {
  try {
    const { class: classId } = req.query;

    if (!classId) {
      return res.status(400).json({
        success: false,
        error: 'Missing required parameter: class',
        example: '/api/timetable/full?class=CSE%203%20B'
      });
    }

    const result = getFullTimetable(classId);

    if (!result.success) {
      return res.status(404).json(result);
    }

    res.json({ success: true, data: result.data });
  } catch (error) {
    console.error('getFullWeekTimetable error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Get next class for today
 * GET /api/timetable/next?class=CSE%203%20B
 */
export const getNextClass = (req, res, next) => {
  try {
    const { class: classId } = req.query;

    if (!classId) {
      return res.status(400).json({
        success: false,
        error: 'Missing required parameter: class'
      });
    }

    const result = getNextClassForDay(classId);

    res.json(result);
  } catch (error) {
    console.error('getNextClass error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Search timetable by subject
 * GET /api/timetable/search?subject=AI
 */
export const searchBySubject = (req, res, next) => {
  try {
    const { subject } = req.query;

    if (!subject) {
      return res.status(400).json({
        success: false,
        error: 'Missing required parameter: subject'
      });
    }

    const result = searchTimetableBySubject(subject);

    res.json(result);
  } catch (error) {
    console.error('searchBySubject error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Legacy endpoint for compatibility
export const getTodayTimetable = (req, res, next) => {
  res.json({ success: true, data: 'Use /api/timetable endpoint instead' });
};

export default {
  getTimetableByDay,
  getFullWeekTimetable,
  getNextClass,
  searchBySubject,
  getTodayTimetable,
};
