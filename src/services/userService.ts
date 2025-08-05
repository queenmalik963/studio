import { db } from '@/lib/firebase';
import { doc, getDoc, onSnapshot, DocumentData, Unsubscribe, runTransaction, writeBatch, increment, updateDoc, arrayUnion } from 'firebase/firestore';

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
    frames?: string[];
    currentFrame?: string;
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
            frames: data.frames || [],
            currentFrame: data.currentFrame || null,
        };
    } else {
        console.log('No such user!');
        return null;
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
                frames: data.frames || [],
                currentFrame: data.currentFrame || null,
            };
            callback(profile);
        } else {
            callback(null);
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

// Function to exchange diamonds for coins (1 Diamond = 2 Coins)
export const exchangeDiamondsForCoins = async (userId: string, diamondsToExchange: number): Promise<{ success: boolean; error?: string }> => {
    const userDocRef = doc(db, 'users', userId);
    const exchangeRate = 2; // 1 diamond = 2 coins
    const coinsToReceive = diamondsToExchange * exchangeRate;

    try {
        await runTransaction(db, async (transaction) => {
            const userDoc = await transaction.get(userDocRef);
            if (!userDoc.exists()) {
                throw new Error("User profile not found.");
            }
            
            const currentDiamonds = userDoc.data().diamonds || 0;
            if (currentDiamonds < diamondsToExchange) {
                throw new Error("Insufficient diamonds to exchange.");
            }

            // Perform the atomic update
            transaction.update(userDocRef, {
                diamonds: increment(-diamondsToExchange),
                coins: increment(coinsToReceive),
            });
        });
        return { success: true };
    } catch (e) {
        console.error("Exchange transaction failed: ", e);
        return { success: false, error: (e as Error).message };
    }
};

// Function to buy a frame
export const buyFrame = async (userId: string, frameId: string, framePrice: number): Promise<{ success: boolean, error?: string }> => {
    const userDocRef = doc(db, 'users', userId);

    try {
        await runTransaction(db, async (transaction) => {
            const userDoc = await transaction.get(userDocRef);
            if (!userDoc.exists()) {
                throw new Error("User not found.");
            }
            const userData = userDoc.data();
            const currentCoins = userData.coins || 0;
            const ownedFrames = userData.frames || [];

            if (currentCoins < framePrice) {
                throw new Error("Insufficient coins.");
            }

            if (ownedFrames.includes(frameId)) {
                throw new Error("Frame already owned.");
            }

            transaction.update(userDocRef, {
                coins: increment(-framePrice),
                frames: arrayUnion(frameId)
            });
        });
        return { success: true };
    } catch (e) {
        console.error("Buy frame transaction failed:", e);
        return { success: false, error: (e as Error).message };
    }
};
