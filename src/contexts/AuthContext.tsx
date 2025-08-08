
"use client";

import { createContext, useContext, ReactNode } from 'react';
import { UserProfile } from '@/services/userService';

// Mock User and UserProfile for a non-Firebase app
type MockUser = {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
};

// This is the single source of truth for our mock user data.
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
    frames: ["gold", "purple"],
    currentFrame: "gold",
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
    loading: false, // Set to false as data is available immediately
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // Since this is a static demo, we provide the user and profile data directly.
    // There's no loading state needed as we aren't fetching anything.
    const value = {
        currentUser: mockUser,
        userProfile: mockUserProfile,
        loading: false,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
