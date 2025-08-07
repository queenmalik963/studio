
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
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

// A helper to easily check if Firebase was initialized correctly elsewhere in the app.
export const areKeysValid = !!firebaseConfig.apiKey && !!firebaseConfig.projectId;

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

if (areKeysValid) {
    if (!getApps().length) {
        app = initializeApp(firebaseConfig);
    } else {
        app = getApp();
    }
    auth = getAuth(app);
    db = getFirestore(app);

    if (typeof window !== 'undefined') {
        if (process.env.NODE_ENV === 'production') {
            try {
                getPerformance(app);
            } catch (e) {
                console.error("Firebase performance monitoring initialization error", e);
            }
        }
    }
} else {
    // Provide mock objects or handle the uninitialized state if keys are not valid
    console.error("Firebase config keys are missing. Firebase services will not be available.");
    // This is a simplified fallback. In a real app, you might want a more robust handling
    // of the uninitialized state, e.g., showing a maintenance page.
    app = {} as FirebaseApp; 
    auth = {} as Auth;
    db = {} as Firestore;
}


export { app, auth, db };
