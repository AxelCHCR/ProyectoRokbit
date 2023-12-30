// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPBO8M7vKkka9CZOCOYA66BDsPAxTSukU",
  authDomain: "colibri-4dd6e.firebaseapp.com",
  projectId: "colibri-4dd6e",
  storageBucket: "colibri-4dd6e.appspot.com",
  messagingSenderId: "691046541976",
  appId: "1:691046541976:web:bd6cefb0cdb69fd10ebeed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);