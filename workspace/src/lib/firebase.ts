// src/lib/firebase.ts

import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth, initializeAuth, indexedDBLocalPersistence } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

// A helper to easily check if Firebase was initialized correctly elsewhere in the app.
export const areKeysValid = !!firebaseConfig.apiKey;

if (!areKeysValid) {
  if (typeof window !== 'undefined') {
    console.error(
      "Firebase configuration is missing or incomplete. Please check your .env file."
    );
  }
  // Provide dummy objects to prevent crashes on the server or client.
  app = {} as FirebaseApp;
  auth = {} as Auth;
  db = {} as Firestore;
} else {
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
    // This is the key change for the reCAPTCHA error.
    // We initialize auth with IndexedDB persistence only on the client-side.
    if (typeof window !== 'undefined') {
      auth = initializeAuth(app, {
        persistence: indexedDBLocalPersistence
      });
    } else {
       auth = getAuth(app);
    }
  } else {
    app = getApps()[0];
    auth = getAuth(app);
  }
  db = getFirestore(app);
}

export { app, auth, db };
