import { adminAuth, adminDB } from "../config/firebaseAdmin.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new Error("No token");

    const decoded = await adminAuth.verifyIdToken(token);

    // attach role by fetching Firestore user doc
    const uid = decoded.uid;
    const userRef = adminDB.collection("users").doc(uid);
    const userDoc = await userRef.get();
    const role = userDoc.exists ? userDoc.data().role : null;

    req.user = { ...decoded, role };
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
