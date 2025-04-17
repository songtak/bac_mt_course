// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration for bac-mt
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

// Additional Firebase apps

/** Firebase 앱: peak-hunter-mountains */
const mountainsConfig = {
  apiKey: "AIzaSyA_z1dhABa0LVtLDB0uE7uu-mXZnglG7r8",
  authDomain: "peak-hunter-mountains.firebaseapp.com",
  projectId: "peak-hunter-mountains",
  storageBucket: "peak-hunter-mountains.firebasestorage.app",
  messagingSenderId: "1065144316854",
  appId: "1:1065144316854:web:3c78137134487baed74717",
  measurementId: "G-WN3EP3TK3S",
};

const secondaryApp =
  getApps().find((a) => a.name === "peakApp") ??
  initializeApp(mountainsConfig, "peakApp");
export const mountains_db = getFirestore(secondaryApp);

/** Firebase 앱: peak-hunter-course */
const courseConfig = {
  apiKey: "AIzaSyCqhZLMvqYN9k3s9TcG_INvAfJDDDKqlnU",
  authDomain: "peak-hunter-course.firebaseapp.com",
  projectId: "peak-hunter-course",
  storageBucket: "peak-hunter-course.firebasestorage.app",
  messagingSenderId: "468043920689",
  appId: "1:468043920689:web:2ab36728fea26e692bac10",
  measurementId: "G-R543E7EPT6",
};

const courseApp =
  getApps().find((a) => a.name === "courseApp") ??
  initializeApp(courseConfig, "courseApp");
export const course_db = getFirestore(courseApp);

/** Firebase 앱: peak-hunter-bookmarks */
const bookmarksConfig = {
  apiKey: "AIzaSyBhHItsyyrZS8hJ0ttmok81y4jWWQ_l18M",
  authDomain: "peak-hunter-bookmarks.firebaseapp.com",
  projectId: "peak-hunter-bookmarks",
  storageBucket: "peak-hunter-bookmarks.firebasestorage.app",
  messagingSenderId: "686033676285",
  appId: "1:686033676285:web:4a0d4e93ec4d1a6c929b94",
  measurementId: "G-82WS2QV16C",
};

const bookmarksApp =
  getApps().find((a) => a.name === "bookmarksApp") ??
  initializeApp(bookmarksConfig, "bookmarksApp");
export const bookmarks_db = getFirestore(bookmarksApp);

/** Firebase 앱: peak-hunter-summits */
const summitsConfig = {
  apiKey: "AIzaSyCqo0IjXsYvbydUzP2IaZo7RofWKrfCINA",
  authDomain: "peak-hunter-summits.firebaseapp.com",
  projectId: "peak-hunter-summits",
  storageBucket: "peak-hunter-summits.firebasestorage.app",
  messagingSenderId: "285683950102",
  appId: "1:285683950102:web:e2b7153b53e64ae8384b37",
  measurementId: "G-7P1V293F8P",
};

// Initialize Firebase for peak-hunter-summits app
const summitsApp =
  getApps().find((a) => a.name === "summitsApp") ??
  initializeApp(summitsConfig, "summitsApp");
export const summits_db = getFirestore(summitsApp);

// Analytics setup for peak-hunter-summits app
// const analytics = getAnalytics(summitsApp);

// // Import the functions you need from the SDKs you need
// import { initializeApp, getApps, getApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBbif3SB3_0AECBBWTFbwrczcgHL3XqEZ4",
//   authDomain: "bac-mt.firebaseapp.com",
//   projectId: "bac-mt",
//   storageBucket: "bac-mt.firebasestorage.app",
//   messagingSenderId: "1037882837393",
//   appId: "1:1037882837393:web:d95ecabcb833c9ba75b230",
//   measurementId: "G-FZ0G2NM7HE",
// };

// // Initialize Firebase
// const mainApp =
//   getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
// export const auth = getAuth(mainApp);
// export const db = getFirestore(mainApp);

// /** 추가 Firebase 앱: peak-hunter-mountains */
// const mountainsConfig = {
//   apiKey: "AIzaSyA_z1dhABa0LVtLDB0uE7uu-mXZnglG7r8",
//   authDomain: "peak-hunter-mountains.firebaseapp.com",
//   projectId: "peak-hunter-mountains",
//   storageBucket: "peak-hunter-mountains.firebasestorage.app",
//   messagingSenderId: "1065144316854",
//   appId: "1:1065144316854:web:3c78137134487baed74717",
//   measurementId: "G-WN3EP3TK3S",
// };

// // 이름 있는 앱으로 두 번째 Firebase 초기화
// const secondaryApp =
//   getApps().find((a) => a.name === "peakApp") ??
//   initializeApp(mountainsConfig, "peakApp");
// export const mountains_db = getFirestore(secondaryApp);

// /** 추가 Firebase 앱: peak-hunter-course */
// const courseConfig = {
//   apiKey: "AIzaSyCqhZLMvqYN9k3s9TcG_INvAfJDDDKqlnU",
//   authDomain: "peak-hunter-course.firebaseapp.com",
//   projectId: "peak-hunter-course",
//   storageBucket: "peak-hunter-course.firebasestorage.app",
//   messagingSenderId: "468043920689",
//   appId: "1:468043920689:web:2ab36728fea26e692bac10",
//   measurementId: "G-R543E7EPT6",
// };

// // 이름 있는 앱으로 세 번째 Firebase 초기화
// const courseApp =
//   getApps().find((a) => a.name === "courseApp") ??
//   initializeApp(courseConfig, "courseApp");
// export const course_db = getFirestore(courseApp);

// /** 추가 Firebase 앱: peak-hunter-bookmarks */
// const bookmarksConfig = {
//   apiKey: "AIzaSyBhHItsyyrZS8hJ0ttmok81y4jWWQ_l18M",
//   authDomain: "peak-hunter-bookmarks.firebaseapp.com",
//   projectId: "peak-hunter-bookmarks",
//   storageBucket: "peak-hunter-bookmarks.firebasestorage.app",
//   messagingSenderId: "686033676285",
//   appId: "1:686033676285:web:4a0d4e93ec4d1a6c929b94",
//   measurementId: "G-82WS2QV16C",
// };

// const bookmarksApp =
//   getApps().find((a) => a.name === "bookmarksApp") ??
//   initializeApp(bookmarksConfig, "bookmarksApp");
// export const bookmarks_db = getFirestore(bookmarksApp);
