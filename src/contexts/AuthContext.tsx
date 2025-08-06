
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db, areKeysValid } from '@/lib/firebase';
import { doc, onSnapshot, DocumentData, Unsubscribe } from 'firebase/firestore';
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
        // If Firebase keys are not valid, stop loading and don't attempt to connect.
        if (!areKeysValid) {
            console.error("Firebase keys are invalid. App cannot connect to Firebase.");
            setLoading(false);
            return;
        }

        const authUnsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            
            let profileUnsubscribe: Unsubscribe | undefined;

            if (user) {
                // If there's a user, set up a listener for their profile.
                const userDocRef = doc(db, 'users', user.uid);
                profileUnsubscribe = onSnapshot(userDocRef, (docSnap) => {
                    if (docSnap.exists()) {
                        setUserProfile({ id: docSnap.id, ...docSnap.data() } as UserProfile);
                    } else {
                        // This case can happen briefly when a user is created but the profile doc isn't ready.
                        setUserProfile(null);
                    }
                    setLoading(false);
                }, (error) => {
                    console.error("Error listening to user profile:", error);
                    setUserProfile(null);
                    setLoading(false);
                });
            } else {
                // If there's no user, clear profile, stop loading, and ensure no profile listener is active.
                setUserProfile(null);
                setLoading(false);
                if (profileUnsubscribe) {
                    profileUnsubscribe();
                }
            }
            
            // Return a cleanup function for the profile listener when the auth state changes or component unmounts.
            return () => {
                if (profileUnsubscribe) {
                    profileUnsubscribe();
                }
            };
        }, (error) => {
            console.error("Auth state error:", error);
            setLoading(false);
        });

        // Main cleanup for the auth listener itself.
        return () => authUnsubscribe();
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
