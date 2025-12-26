import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  const user = userCredential.user;

  const idToken = await user.getIdToken();
  const resp = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${idToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  });

  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to fetch role');
  }

  const data = await resp.json();
  return { user, role: data.role };
};

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);
  const user = userCredential.user;

  const idToken = await user.getIdToken();
  const resp = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${idToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  });

  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to fetch role');
  }

  const data = await resp.json();
  return { user, role: data.role };
};
