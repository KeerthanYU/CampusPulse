import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA5ianYNiCo0p0_Fm6WaoowYvRe3w_sqWY",
  authDomain: "campuspulse-20db2.firebaseapp.com",
  projectId: "campuspulse-20db2",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
