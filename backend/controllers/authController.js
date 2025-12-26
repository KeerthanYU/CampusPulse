import { auth } from "../config/firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    res.json({
      success: true,
      uid: userCredential.user.uid,
      message: "Login successful",
    });
  } catch (error) {
    next(error);
  }
};
