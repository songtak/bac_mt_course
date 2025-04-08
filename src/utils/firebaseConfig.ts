// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

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
const mainApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(mainApp);
export const db = getFirestore(mainApp);

/** 추가 Firebase 앱: peak-hunter-mountains */
const peakHunterConfig = {
  apiKey: "AIzaSyA_z1dhABa0LVtLDB0uE7uu-mXZnglG7r8",
  authDomain: "peak-hunter-mountains.firebaseapp.com",
  projectId: "peak-hunter-mountains",
  storageBucket: "peak-hunter-mountains.firebasestorage.app",
  messagingSenderId: "1065144316854",
  appId: "1:1065144316854:web:3c78137134487baed74717",
  measurementId: "G-WN3EP3TK3S",
};

// 이름 있는 앱으로 두 번째 Firebase 초기화
const secondaryApp =
  getApps().find((a) => a.name === "peakApp") ??
  initializeApp(peakHunterConfig, "peakApp");

export const mountains_db = getFirestore(secondaryApp);
