
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db, areKeysValid } from '@/lib/firebase';
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
        // If firebase keys are not valid, we can't do anything. Stop loading.
        if (!areKeysValid || !auth || !db) {
            setLoading(false);
            return;
        }

        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            if (user) {
                // User is signed in. Listen for their profile document.
                const unsubscribeProfile = onSnapshot(doc(db, 'users', user.uid), (docSnap) => {
                    if (docSnap.exists()) {
                        setUserProfile({ id: docSnap.id, ...docSnap.data() } as UserProfile);
                    } else {
                        setUserProfile(null);
                    }
                    // Crucially, only set loading to false AFTER we have a definitive answer on the profile.
                    setLoading(false);
                }, (error) => {
                    console.error("Error listening to user profile:", error);
                    setUserProfile(null);
                    setLoading(false); // Also stop loading on error.
                });

                // This will be called when the user logs out.
                return () => unsubscribeProfile();
            } else {
                // User is signed out. Clear everything and stop loading.
                setCurrentUser(null);
                setUserProfile(null);
                setLoading(false);
            }
        });

        // This will be called on component unmount.
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
