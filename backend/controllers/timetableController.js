import * as timetableService from "../services/timetableService.js";

export const getTodayTimetable = async (req, res, next) => {
  try {
    const timetable = await timetableService.getToday();
    res.json({ success: true, data: timetable });
  } catch (err) {
    next(err);
  }
};
