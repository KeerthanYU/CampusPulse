import { db } from "../config/firebase.js";
import { collection, getDocs } from "firebase/firestore";

export const getToday = async () => {
  const snapshot = await getDocs(collection(db, "timetables"));
  return snapshot.docs.map(doc => doc.data());
};
