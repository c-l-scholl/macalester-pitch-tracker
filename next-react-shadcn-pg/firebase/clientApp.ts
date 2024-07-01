// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,

  authDomain: "macalester-pitch-tracking.firebaseapp.com",

  projectId: "macalester-pitch-tracking",

  storageBucket: "macalester-pitch-tracking.appspot.com",

  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,

  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,

  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { app, auth, googleProvider, db };
