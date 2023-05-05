// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0XOwXFpnHD7u2h-ik3TsbABe52DdC__I",
  authDomain: "match-game-30671.firebaseapp.com",
  projectId: "match-game-30671",
  storageBucket: "match-game-30671.appspot.com",
  messagingSenderId: "260015222549",
  appId: "1:260015222549:web:85b13d412b8a6067c0c31c",
  measurementId: "G-YCZFJ1M5GW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
