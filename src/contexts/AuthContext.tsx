
"use client";

import { createContext, useContext, ReactNode } from 'react';

// This is the single source of truth for our mock user data.
// It is now static and available immediately to all components.

export type UserProfile = {
    id: string;
    name: string;
    username: string;
    bio: string;
    avatar: string;
    coins: number;
    diamonds: number;
    followers: number;
    following: number;
    idLevel: number;
    sendingLevel: number;
    frames?: string[];
    currentFrame?: string;
    vipTier?: 'baron' | 'duke' | 'prince' | 'shogun' | null;
    vipExpiry?: Date;
};

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
    currentUser: MockUser;
    userProfile: UserProfile;
}

const AuthContext = createContext<AuthContextType>({
    currentUser: mockUser,
    userProfile: mockUserProfile,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // The value is now static and constant, ensuring no re-renders or loading states.
    const value = {
        currentUser: mockUser,
        userProfile: mockUserProfile,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
