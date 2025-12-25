import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA5ianYNiCo0p0_Fm6WaoowYvRe3w_sqWY",
  authDomain: "campuspulse-20db2.firebaseapp.com",
  projectId: "campuspulse-20db2",
  storageBucket: "campuspulse-20db2.firebasestorage.app",
  messagingSenderId: "502415946308",
  appId: "1:502415946308:web:8272470dc34c8dd8dd4211"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
