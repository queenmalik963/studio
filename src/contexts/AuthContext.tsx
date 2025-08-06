
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
            setCurrentUser(user);
            
            if (user) {
                // If user is logged in, listen to their profile document
                const userDocRef = doc(db, 'users', user.uid);
                const unsubscribeProfile = onSnapshot(userDocRef, (docSnap) => {
                    if (docSnap.exists()) {
                        setUserProfile({ id: docSnap.id, ...docSnap.data() } as UserProfile);
                    } else {
                        // This case can happen briefly if the user document hasn't been created yet.
                        setUserProfile(null);
                    }
                    // Only stop loading after we have a definitive answer on the profile
                    setLoading(false);
                }, (error) => {
                    console.error("Error listening to user profile:", error);
                    setUserProfile(null);
                    setLoading(false);
                });
                
                // Return the profile listener unsubscribe function to be called on cleanup
                return () => unsubscribeProfile();
            } else {
                // If user is not logged in, clear profile and stop loading immediately
                setUserProfile(null);
                setCurrentUser(null);
                setLoading(false);
            }
        });

        // Return the auth listener unsubscribe function
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
