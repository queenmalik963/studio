
// src/lib/firebase.ts
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth, initializeAuth, indexedDBLocalPersistence } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { getPerformance } from "firebase/performance";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
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
}

// Initialize Firebase
if (getApps().length) {
    app = getApps()[0];
} else {
    app = initializeApp(firebaseConfig);
}

// Initialize services
if (typeof window !== 'undefined') {
    // Client-side initialization
    auth = initializeAuth(app, {
        persistence: indexedDBLocalPersistence,
    });
    getPerformance(app);

    if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
        initializeAppCheck(app, {
            provider: new ReCaptchaV3Provider(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY),
            isTokenAutoRefreshEnabled: true,
        });
    }
} else {
    // Server-side initialization
    auth = getAuth(app);
}

db = getFirestore(app);

export { app, auth, db };
