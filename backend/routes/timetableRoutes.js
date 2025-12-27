import express from 'express';
import * as timetableController from '../controllers/timetableController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

/**
 * Timetable API Routes
 * 
 * GET /api/timetable?class=CSE%203%20B&day=Monday
 *   → Get timetable for a specific day
 * 
 * GET /api/timetable/full?class=CSE%203%20B
 *   → Get full week timetable for a class
 * 
 * GET /api/timetable/next?class=CSE%203%20B
 *   → Get next class starting from current time
 * 
 * GET /api/timetable/search?subject=AI
 *   → Search for timetable entries by subject name
 */

// Main endpoint - timetable by day
router.get('/', timetableController.getTimetableByDay);

// Full week timetable
router.get('/full', timetableController.getFullWeekTimetable);

// Next class
router.get('/next', timetableController.getNextClass);

// Search by subject
router.get('/search', timetableController.searchBySubject);

export default router;
