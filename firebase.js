// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNS3ANT_O2uhYv3IFxH7zP47qk4EWK0bY",
  authDomain: "flashcards-b7a3c.firebaseapp.com",
  projectId: "flashcards-b7a3c",
  storageBucket: "flashcards-b7a3c.appspot.com",
  messagingSenderId: "851648561812",
  appId: "1:851648561812:web:f638b5fd684091da6d6a81",
  measurementId: "G-N2WRSHHCBD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}