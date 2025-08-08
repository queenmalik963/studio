
"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { getMockUser, getMockUserProfile, UserProfile, MockUser } from '@/services/userService';


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
    const [currentUser, setCurrentUser] = useState<MockUser | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching user data
        const user = getMockUser();
        const profile = getMockUserProfile();
        setCurrentUser(user);
        setUserProfile(profile);
        setLoading(false);
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
