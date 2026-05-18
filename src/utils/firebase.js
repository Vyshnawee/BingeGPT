// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8dqUN4ZVX_EtcJz62hlksw2eyh8vTIWw",
  authDomain: "bingegpt-ac4cb.firebaseapp.com",
  projectId: "bingegpt-ac4cb",
  storageBucket: "bingegpt-ac4cb.firebasestorage.app",
  messagingSenderId: "540102514919",
  appId: "1:540102514919:web:014171ce549df7a5d96a42",
  measurementId: "G-C17EGGBV19",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
