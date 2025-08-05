import { db } from '@/lib/firebase';
import { doc, getDoc, onSnapshot, DocumentData, Unsubscribe } from 'firebase/firestore';

export interface UserProfile {
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
}

// Function to get a user's profile once
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
    const userDocRef = doc(db, 'users', userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
        const data = userDocSnap.data() as DocumentData;
        return {
            id: userDocSnap.id,
            name: data.name || 'User',
            username: data.username || 'username',
            bio: data.bio || 'Welcome to my profile!',
            avatar: data.avatar || 'https://placehold.co/100x100.png',
            coins: data.coins || 0,
            diamonds: data.diamonds || 0,
            followers: data.followers || 0,
            following: data.following || 0,
            idLevel: data.idLevel || 0,
            sendingLevel: data.sendingLevel || 0,
        };
    } else {
        console.log('No such user!');
        // For demo, we can return a default profile
        return {
            id: userId,
            name: 'New User',
            username: 'newuser',
            bio: 'Welcome to my profile!',
            avatar: 'https://placehold.co/100x100.png',
            coins: 0,
            diamonds: 0,
            followers: 0,
            following: 0,
            idLevel: 0,
            sendingLevel: 0,
        };
    }
};

// Function to listen to real-time updates on a user's profile
export const listenToUserProfile = (userId: string, callback: (profile: UserProfile | null) => void): Unsubscribe => {
    const userDocRef = doc(db, 'users', userId);

    const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
        if (docSnap.exists()) {
            const data = docSnap.data() as DocumentData;
            const profile: UserProfile = {
                id: docSnap.id,
                name: data.name || 'User',
                username: data.username || 'username',
                bio: data.bio || 'Welcome to my profile!',
                avatar: data.avatar || 'https://placehold.co/100x100.png',
                coins: data.coins || 0,
                diamonds: data.diamonds || 0,
                followers: data.followers || 0,
                following: data.following || 0,
                idLevel: data.idLevel || 0,
                sendingLevel: data.sendingLevel || 0,
            };
            callback(profile);
        } else {
            // For demo purposes, create a default profile if one doesn't exist
             const profile: UserProfile = {
                id: userId,
                name: 'New User',
                username: 'newuser',
                bio: 'Welcome to my profile!',
                avatar: 'https://placehold.co/100x100.png',
                coins: 0,
                diamonds: 0,
                followers: 0,
                following: 0,
                idLevel: 0,
                sendingLevel: 0,
            };
            callback(profile);
        }
    });

    return unsubscribe;
};
