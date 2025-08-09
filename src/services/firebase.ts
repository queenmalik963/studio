import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDbePWebF5_5k2AN61X0pwr2oyL6yrkqBk",
    authDomain: "ravewaveapp.firebaseapp.com",
    databaseURL: "https://ravewaveapp-default-rtdb.firebaseio.com",
    projectId: "ravewaveapp",
    storageBucket: "ravewaveapp.appspot.com",
    messagingSenderId: "308572836717",
    appId: "1:308572836717:web:973439037c76af4ed6c064",
    measurementId: "G-V60FP7V7CM"

  // Initialize Firebase
  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

// Export the necessary Firebase services for the rest of the kingdom to use.
export { app, auth, db };
