
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, onSnapshot, DocumentData } from 'firebase/firestore';
import { UserProfile } from '@/services/userService';

interface AuthContextType {
    currentUser: User | null;
    userProfile: UserProfile | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    currentUser: null,
    userProfile: null,
    loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, set the user object.
                setCurrentUser(user);

                // Now, listen for the user's profile document.
                const userDocRef = doc(db, 'users', user.uid);
                const unsubscribeProfile = onSnapshot(userDocRef, (docSnap) => {
                    if (docSnap.exists()) {
                        // Profile exists, set it.
                        setUserProfile({ id: docSnap.id, ...docSnap.data() } as UserProfile);
                    } else {
                        // Profile does not exist (this can happen briefly during signup).
                        setUserProfile(null);
                    }
                    // Crucially, only set loading to false AFTER we have a definitive answer on the profile.
                    setLoading(false);
                }, (error) => {
                    console.error("Error listening to user profile:", error);
                    setUserProfile(null);
                    setLoading(false); // Also stop loading on error.
                });

                // Return the profile listener's unsubscribe function.
                // This will be called when the user logs out.
                return () => unsubscribeProfile();
            } else {
                // User is signed out. Clear everything and stop loading.
                setCurrentUser(null);
                setUserProfile(null);
                setLoading(false);
            }
        });

        // Return the auth listener's unsubscribe function to be called on component unmount.
        return () => unsubscribeAuth();
    }, []);

    const value = {
        currentUser,
        userProfile,
        loading,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
