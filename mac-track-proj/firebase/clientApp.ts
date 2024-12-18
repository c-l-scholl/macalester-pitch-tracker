import { initializeApp } from "firebase/app";
import {
	getAuth,
	GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

  apiKey: "AIzaSyCj2CaaGlDtJsGHKECYi_3X7gJ1d-GhOZA",

  authDomain: "macalester-pitch-tracking.firebaseapp.com",

  projectId: "macalester-pitch-tracking",

  storageBucket: "macalester-pitch-tracking.appspot.com",

  messagingSenderId: "996067582924",

  appId: "1:996067582924:web:80a551badd88ba692c3369",

  measurementId: "G-WJBNF7TC0Y"

};


// const firebaseConfig = {
// 	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,

// 	authDomain: "macalester-pitch-tracking.firebaseapp.com",

// 	projectId: "macalester-pitch-tracking",

// 	storageBucket: "macalester-pitch-tracking.appspot.com",

// 	messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,

// 	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,

// 	measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
// };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);


export { app, auth, googleProvider, db };
