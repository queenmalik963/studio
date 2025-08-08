
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile } from '@/services/userService';

// Mock User and UserProfile for a non-Firebase app
type MockUser = {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
};

const mockUserProfile: UserProfile = {
    id: "mock_user_123",
    name: "Rave King",
    username: "raveking",
    bio: "Welcome to my kingdom! Enjoy the rave.",
    avatar: "https://placehold.co/100x100/8b5cf6/ffffff.png?text=RK",
    coins: 99999,
    diamonds: 8888,
    followers: 1200,
    following: 150,
    idLevel: 45,
    sendingLevel: 60,
    frames: ["gold", "purple", "master"],
    currentFrame: "master",
    vipTier: "shogun",
    vipExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
};

const mockUser: MockUser = {
    uid: mockUserProfile.id,
    email: 'king@ravewave.com',
    displayName: mockUserProfile.name,
    photoURL: mockUserProfile.avatar,
}

interface AuthContextType {
    currentUser: MockUser | null;
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
    // We'll simulate a logged-in state. In a real non-Firebase app,
    // this would be determined by a token, session, etc.
    const [currentUser] = useState<MockUser | null>(mockUser);
    const [userProfile] = useState<UserProfile | null>(mockUserProfile);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading delay
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
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
