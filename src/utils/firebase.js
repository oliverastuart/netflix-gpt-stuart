// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBK96jTwkmAvn01SR9T6sdygXVZd3Ihdf4",
  authDomain: "netflix-gpt-stuart.firebaseapp.com",
  projectId: "netflix-gpt-stuart",
  storageBucket: "netflix-gpt-stuart.appspot.com",
  messagingSenderId: "289378481140",
  appId: "1:289378481140:web:b271b07c62fcfb0d5bffa1",
  measurementId: "G-PR209FW3VL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
