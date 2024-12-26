// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKzdjHzQ3kgG5AsQ2gpr7p2n19XGAC1eg",
  authDomain: "todojs-79893.firebaseapp.com",
  databaseURL:
    "https://todojs-79893-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "todojs-79893",
  storageBucket: "todojs-79893.firebasestorage.app",
  messagingSenderId: "659450602172",
  appId: "1:659450602172:web:42731c492edaa727f826b9",
  measurementId: "G-XNQLZEFEZ9",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
