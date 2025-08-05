import { db } from '@/lib/firebase';
import { doc, getDoc, onSnapshot, DocumentData, Unsubscribe, runTransaction, writeBatch, increment, updateDoc } from 'firebase/firestore';

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

// Function to update a user's profile
export const updateUserProfile = async (userId: string, data: Partial<UserProfile>, incrementCoins = false): Promise<{ success: boolean, error?: string }> => {
    const userDocRef = doc(db, 'users', userId);
    try {
        if (incrementCoins && data.coins) {
             await updateDoc(userDocRef, {
                coins: increment(data.coins)
            });
        } else {
            await updateDoc(userDocRef, data);
        }
        return { success: true };
    } catch (e) {
        console.error("Error updating user profile:", e);
        return { success: false, error: (e as Error).message };
    }
};


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
            name: 'Demo User',
            username: 'demouser',
            bio: 'This is a demo profile for a user that does not exist in the database yet.',
            avatar: 'https://placehold.co/100x100.png',
            coins: 100,
            diamonds: 50,
            followers: 120,
            following: 75,
            idLevel: 5,
            sendingLevel: 3,
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
                name: 'Demo User',
                username: 'demouser',
                bio: 'This is a demo profile for a user that does not exist in the database yet.',
                avatar: 'https://placehold.co/100x100.png',
                coins: 100,
                diamonds: 50,
                followers: 120,
                following: 75,
                idLevel: 5,
                sendingLevel: 3,
            };
            callback(profile);
        }
    }, (error) => {
        console.error("Error listening to user profile:", error);
        callback(null);
    });

    return unsubscribe;
};

// Function to follow a user
export const followUser = async (currentUserId: string, targetUserId: string): Promise<{ success: boolean, error?: string }> => {
    if (currentUserId === targetUserId) {
        return { success: false, error: "You cannot follow yourself." };
    }

    const currentUserDocRef = doc(db, 'users', currentUserId);
    const targetUserDocRef = doc(db, 'users', targetUserId);
    const followingRef = doc(db, `users/${currentUserId}/following`, targetUserId);
    const followersRef = doc(db, `users/${targetUserId}/followers`, currentUserId);

    try {
        await runTransaction(db, async (transaction) => {
            const targetUserDoc = await transaction.get(targetUserDocRef);
            if (!targetUserDoc.exists()) {
                throw new Error("User to follow does not exist.");
            }
            // Use writeBatch inside transaction for non-read operations
            const batch = writeBatch(db);

            // Increment counts
            batch.update(currentUserDocRef, { following: increment(1) });
            batch.update(targetUserDocRef, { followers: increment(1) });

            // Add records to subcollections
            batch.set(followingRef, { userId: targetUserId, timestamp: new Date() });
            batch.set(followersRef, { userId: currentUserId, timestamp: new Date() });
            
            // This is incorrect. A transaction's callback must be passed the transaction object.
            // and all writes must be performed on that object. A write batch is not needed.
            await batch.commit();
        });

        await runTransaction(db, async (transaction) => {
            const targetUserDoc = await transaction.get(targetUserDocRef);
            if (!targetUserDoc.exists()) {
                throw new Error("User to follow does not exist.");
            }
            transaction.update(currentUserDocRef, { following: increment(1) });
            transaction.update(targetUserDocRef, { followers: increment(1) });
            transaction.set(followingRef, { userId: targetUserId, timestamp: new Date() });
            transaction.set(followersRef, { userId: currentUserId, timestamp: new Date() });
        });

        return { success: true };
    } catch (e) {
        console.error("Follow user transaction failed: ", e);
        return { success: false, error: (e as Error).message };
    }
};

// Function to unfollow a user
export const unfollowUser = async (currentUserId: string, targetUserId: string): Promise<{ success: boolean, error?: string }> => {
    if (currentUserId === targetUserId) {
        return { success: false, error: "You cannot unfollow yourself." };
    }

    const currentUserDocRef = doc(db, 'users', currentUserId);
    const targetUserDocRef = doc(db, 'users', targetUserId);
    const followingRef = doc(db, `users/${currentUserId}/following`, targetUserId);
    const followersRef = doc(db, `users/${targetUserId}/followers`, currentUserId);

    try {
        await runTransaction(db, async (transaction) => {
            const targetUserDoc = await transaction.get(targetUserDocRef);
            if (!targetUserDoc.exists()) {
                throw new Error("User to unfollow does not exist.");
            }

            transaction.update(currentUserDocRef, { following: increment(-1) });
            transaction.update(targetUserDocRef, { followers: increment(-1) });
            transaction.delete(followingRef);
            transaction.delete(followersRef);
        });
        return { success: true };
    } catch (e) {
        console.error("Unfollow user transaction failed: ", e);
        return { success: false, error: (e as Error).message };
    }
};
