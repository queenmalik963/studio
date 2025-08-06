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

// This check is crucial for preventing crashes when keys are missing.
if (
  !firebaseConfig.apiKey ||
  !firebaseConfig.authDomain ||
  !firebaseConfig.projectId
) {
  if (typeof window !== 'undefined') {
    console.error(
      "Firebase configuration is missing or incomplete. Please check your .env file."
    );
  }
  // Provide dummy objects to prevent crashes on the server or client.
  // The app will operate in a 'logged-out' or 'config-missing' state.
  app = {} as FirebaseApp;
  auth = {} as Auth;
  db = {} as Firestore;
} else {
    if (getApps().length === 0) {
        app = initializeApp(firebaseConfig);
        if (typeof window !== 'undefined') {
            // This is the key change for the reCAPTCHA error.
            // We initialize auth with IndexedDB persistence only on the client-side.
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

// A helper to easily check if Firebase was initialized correctly elsewhere in the app.
export const areKeysValid = !!firebaseConfig.apiKey;

export { app, auth, db };
