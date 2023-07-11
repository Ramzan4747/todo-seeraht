// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhispISQHfDMfkaH2CtK4MfL5iZVAoiLc",
  authDomain: "todo-firebase-77c6b.firebaseapp.com",
  projectId: "todo-firebase-77c6b",
  storageBucket: "todo-firebase-77c6b.appspot.com",
  messagingSenderId: "721904918895",
  appId: "1:721904918895:web:cdbffc12d8ef991c04889a",
  measurementId: "G-LSDRQ8B1MV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth= getAuth(app);
const db= getFirestore(app)

export {analytics, auth, db};