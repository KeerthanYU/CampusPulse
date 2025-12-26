import { db } from "../config/firebase.js";
import { collection, addDoc } from "firebase/firestore";

export const create = async (data) => {
  const docRef = await addDoc(collection(db, "grievances"), data);
  return { id: docRef.id, ...data };
};
