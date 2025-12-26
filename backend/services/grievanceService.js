import { adminDB } from "../config/firebaseAdmin.js";

export const create = async (data) => {
  const docRef = await adminDB.collection("grievances").add(data);
  return { id: docRef.id, ...data };
};
