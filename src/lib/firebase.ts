
// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// ====================================================================================
// ====================================================================================
// ====================================================================================
//
// ==> AAPKA KAAM YAHAN HAI (YOUR TASK IS HERE) <==
//
// Neeche diye gaye `firebaseConfig` object ko apne asal Firebase project ki 
// configuration se badal dein.
//
// Aapko yeh configuration yahan se milegi:
// Firebase Console -> Project Settings (⚙️ icon) -> General Tab -> Your Apps -> Firebase SDK snippet -> Config
//
// Link: https://console.firebase.google.com/
//
// ====================================================================================
// ====================================================================================
// ====================================================================================

// Your web app's Firebase configuration
// IMPORTANT: Replace this with your own Firebase project configuration
const firebaseConfig = {
  apiKey: "AlzaSyDbePWebF5_5k2AN61X0pwr2oyL6yrkqBk",
  authDomain: "ravewaveapp.firebaseapp.com",
  projectId: "ravewaveapp",
  storageBucket: "ravewaveapp.appspot.com",
  messagingSenderId: "308572836717",
  appId: "1:308572836717:web:b8d502f682522a466a9c79"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
