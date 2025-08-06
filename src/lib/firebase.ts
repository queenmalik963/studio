
// IMPORTANT: This line ensures that environment variables are loaded for server-side rendering.
import '@/ai/dotenv';

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
// IMPORTANT: This is now configured to use environment variables.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY, 
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
