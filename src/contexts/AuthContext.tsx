
"use client";

import { createContext, useContext, ReactNode, useState, useEffect, useCallback } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '@/services/firebase';
import { UserProfile, getMockUserProfile } from '@/services/userService';

interface AuthContextType {
    currentUser: User | null;
    userProfile: UserProfile | null;
    loading: boolean;
    updateUserProfileState: (newProfile: UserProfile) => void;
}

const AuthContext = createContext<AuthContextType>({
    currentUser: null,
    userProfile: null,
    loading: true,
    updateUserProfileState: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);
            if (user) {
                // User is signed in, listen for profile changes
                const profileRef = doc(db, 'users', user.uid);
                const unsubscribeProfile = onSnapshot(profileRef, (docSnap) => {
                    if (docSnap.exists()) {
                        setUserProfile(docSnap.data() as UserProfile);
                    } else {
                        // This case can happen for a newly created user before their profile is set
                        console.log("No such profile document!");
                        setUserProfile(null);
                    }
                    setLoading(false);
                });
                return () => unsubscribeProfile();
            } else {
                // User is signed out
                setUserProfile(null);
                setLoading(false);
            }
        });

        return () => unsubscribeAuth();
    }, []);

    const updateUserProfileState = useCallback((newProfile: UserProfile) => {
        setUserProfile(newProfile);
    }, []);

    const value = {
        currentUser,
        userProfile,
        loading,
        updateUserProfileState,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
