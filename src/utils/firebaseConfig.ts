// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbif3SB3_0AECBBWTFbwrczcgHL3XqEZ4",
  authDomain: "bac-mt.firebaseapp.com",
  projectId: "bac-mt",
  storageBucket: "bac-mt.firebasestorage.app",
  messagingSenderId: "1037882837393",
  appId: "1:1037882837393:web:d95ecabcb833c9ba75b230",
  measurementId: "G-FZ0G2NM7HE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
