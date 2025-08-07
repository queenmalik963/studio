
import { 
    auth, 
    db 
} from '@/lib/firebase';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    GoogleAuthProvider, 
    signInWithPopup,
    signOut,
    User
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';

// Helper function to create a user profile document in Firestore
const createUserProfileDocument = async (user: User) => {
    const userDocRef = doc(db, 'users', user.uid);
    const userDocSnap = await getDoc(userDocRef);

    // Only create the document if it doesn't already exist.
    if (!userDocSnap.exists()) {
        const { email } = user;
        // Generate a username from the email or use a default.
        const username = email ? email.split('@')[0] : `user_${user.uid.substring(0, 5)}`;
        
        try {
            await setDoc(userDocRef, {
                id: user.uid,
                name: user.displayName || username,
                username: username,
                email: email,
                avatar: user.photoURL || `https://placehold.co/100x100.png?text=${username.charAt(0).toUpperCase()}`,
                bio: 'Welcome to my RaveWave profile!',
                coins: 10000, // Starting coins for new users
                diamonds: 0,
                followers: 0,
                following: 0,
                idLevel: 1,
                sendingLevel: 1,
                createdAt: serverTimestamp(),
                frames: [],
                currentFrame: null,
                vipTier: null,
                vipExpiry: null,
            });
        } catch (error) {
            console.error("Error creating user profile:", error);
            // This will now be caught by the calling function.
            throw error; 
        }
    }
};


// Sign up with email and password
export const signUpWithEmail = async (email: string, password: string) => {
    try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        await createUserProfileDocument(user);
        return { success: true, user, error: null, code: null };
    } catch (error: any) {
        console.error("Signup error:", error.code, error.message);
        return { success: false, user: null, error: error.message, code: error.code };
    }
};

// Sign in with email and password
export const signInWithEmail = async (email: string, password: string) => {
    try {
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        // Ensure profile exists on login as well
        await createUserProfileDocument(user);
        return { success: true, user, error: null, code: null };
    } catch (error: any) {
        console.error("Signin error:", error.code, error.message);
        return { success: false, user: null, error: error.message, code: error.code };
    }
};

// Sign in with Google
export const signInWithGoogleProvider = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
        const { user } = await signInWithPopup(auth, provider);
        await createUserProfileDocument(user);
        return { success: true, user, error: null, code: null };
    } catch (error: any)
        {
        console.error("Google signin error:", error.code, error.message);
        return { success: false, user: null, error: error.message, code: error.code };
    }
};

// Sign out
export const signOutUser = async () => {
    try {
        await signOut(auth);
        return { success: true, error: null };
    } catch (error: any) {
        console.error("Signout error:", error.code, error.message);
        return { success: false, error: (error as Error).message };
    }
};
