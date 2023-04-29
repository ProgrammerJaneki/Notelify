import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from 'firebase/firestore'
import firebase from 'firebase/app';
import 'firebase/firestore';
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBz0LGdyV2U80JmlxOdYAAc6KYFC_HIDwo",
  authDomain: "notelify-9094c.firebaseapp.com",
  projectId: "notelify-9094c",
  storageBucket: "notelify-9094c.appspot.com",
  messagingSenderId: "135395391103",
  appId: "1:135395391103:web:637acded9220501692714a",
  measurementId: "G-0JPRMN8MHB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

// for firestore database
export const db = getFirestore(app)
// const analytics = getAnalytics(app);