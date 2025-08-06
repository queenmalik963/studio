// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";

// Your web app's Firebase configuration is now sourced from environment variables.
// next.config.ts handles loading the .env file.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY, 
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Defensive check for keys. If they are not present, we can't initialize.
export const areKeysValid = !!firebaseConfig.apiKey && !!firebaseConfig.projectId;

let app: FirebaseApp;
let db: Firestore;
let auth: Auth;

// Initialize Firebase only if the keys are valid and it's not already initialized.
if (areKeysValid) {
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
  db = getFirestore(app);
  auth = getAuth(app);
} else {
  // Provide dummy objects to prevent crashes when keys are missing.
  // The app will remain in a "logged out" state.
  console.error("Firebase configuration is missing or incomplete. Please check your .env file. The app will run in a logged-out state.");
  app = {} as FirebaseApp;
  db = {} as Firestore;
  auth = {} as Auth;
}

export { app, db, auth };
