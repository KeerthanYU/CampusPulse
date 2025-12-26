import { adminAuth, adminDB } from "../config/firebaseAdmin.js";

// Server-side login: verify the client ID token (Firebase Auth) and return user info + role
export const login = async (req, res, next) => {
  try {
    // Accept token in Authorization header (Bearer) or in body.idToken
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.split(" ")[1] : req.body.idToken;

    if (!token) return res.status(400).json({ success: false, message: "Missing ID token" });

    const decoded = await adminAuth.verifyIdToken(token);
    const uid = decoded.uid;

    // Fetch user role from Firestore (admin DB). If missing, auto-provision with default role 'student'
    const userRef = adminDB.collection("users").doc(uid);
    const userDoc = await userRef.get();
    let role = null;
    if (!userDoc.exists) {
      role = "student";
      await userRef.set({ email: decoded.email || null, name: decoded.name || null, role, createdAt: new Date() });
    } else {
      role = userDoc.data().role || null;
    }

    return res.json({ success: true, uid, email: decoded.email, name: decoded.name || decoded.email, role });
  } catch (error) {
    return next(error);
  }
};

// Register endpoint: create a new Firebase Auth user and corresponding Firestore document
export const register = async (req, res, next) => {
  try {
    const { name, email, password, role = "student" } = req.body;
    if (!email || !password || !name) return res.status(400).json({ success: false, message: "Missing fields" });

    // create user in Firebase Auth
    const userRecord = await adminAuth.createUser({ email, password, displayName: name });

    // create Firestore user doc
    await adminDB.collection("users").doc(userRecord.uid).set({ email, name, role, createdAt: new Date() });

    return res.json({ success: true, uid: userRecord.uid, message: "User registered" });
  } catch (error) {
    return next(error);
  }
};
