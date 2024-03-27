// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAb2V8817SYfcdz8Xb9f6e2U34UX67ubTo",
  authDomain: "daybuddy-6b879.firebaseapp.com",
  databaseURL: "https://daybuddy-6b879-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "daybuddy-6b879",
  storageBucket: "daybuddy-6b879.appspot.com",
  messagingSenderId: "393458408143",
  appId: "1:393458408143:web:002da3a958bedad8e175ba",
  measurementId: "G-N3X2BL6N77"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const db = getDatabase();

// Initialize Firebase
export {app, auth, analytics, db}

