import { adminDB } from "../config/firebaseAdmin.js";

export const getAllUsers = async () => {
  const snapshot = await adminDB.collection("users").get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
