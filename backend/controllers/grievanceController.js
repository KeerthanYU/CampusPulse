import * as grievanceService from "../services/grievanceService.js";

export const submitGrievance = async (req, res, next) => {
  try {
    const grievance = await grievanceService.create(req.body);
    res.json({ success: true, data: grievance });
  } catch (err) {
    next(err);
  }
};
