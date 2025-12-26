import { adminDB } from "../config/firebaseAdmin.js";

export const getToday = async () => {
  const snapshot = await adminDB.collection("timetables").get();
  return snapshot.docs.map((doc) => doc.data());
};
