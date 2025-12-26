import { db } from "../config/firebase.js";
import { collection, getDocs } from "firebase/firestore";

export const getAllUsers = async () => {
  const snapshot = await getDocs(collection(db, "users"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
