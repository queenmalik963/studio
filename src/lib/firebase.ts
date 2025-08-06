
// src/lib/firebase.ts

import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth, initializeAuth, indexedDBLocalPersistence } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

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
export const areKeysValid = !!firebaseConfig.apiKey && !!firebaseConfig.projectId;

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
    
    if (typeof window !== 'undefined') {
      // Initialize App Check for client-side FIRST
      if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
        initializeAppCheck(app, {
          provider: new ReCaptchaV3Provider(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY),
          isTokenAutoRefreshEnabled: true
        });
      } else {
        console.warn("reCAPTCHA Site Key is missing. App Check will not be initialized, which may affect authentication security.");
      }

      // THEN, initialize Auth with persistence for client-side
      auth = initializeAuth(app, {
        persistence: indexedDBLocalPersistence
      });

    } else {
       // For server-side rendering, just get the auth instance
       auth = getAuth(app);
    }
  } else {
    app = getApps()[0];
    auth = getAuth(app);
  }
  db = getFirestore(app);
}

export { app, auth, db };
