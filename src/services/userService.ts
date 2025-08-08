import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

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
    currentFrame?: string | null;
    vipTier?: 'baron' | 'duke' | 'prince' | 'shogun' | null;
    vipExpiry?: any;
};

export type MockUser = {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
};

// --- Service Functions ---
type ServiceResult<T> = { success: boolean; error?: string; updatedProfile?: T };

export const updateUserProfile = async (userId: string, data: Partial<UserProfile>): Promise<ServiceResult<UserProfile>> => {
    try {
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, data);

        const updatedDoc = await getDoc(userRef);
        if (updatedDoc.exists()) {
            const updatedProfile = updatedDoc.data() as UserProfile;
            return { success: true, updatedProfile };
        } else {
             return { success: false, error: "Profile not found after update." };
        }
    } catch (error: any) {
        console.error("Error updating profile:", error);
        return { success: false, error: error.message };
    }
};

export const exchangeDiamondsForCoins = async (userId: string, diamondsToExchange: number): Promise<ServiceResult<UserProfile>> => {
    const userRef = doc(db, "users", userId);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
        return { success: false, error: "User not found" };
    }
    const userProfile = docSnap.data() as UserProfile;

    if (userProfile.diamonds < diamondsToExchange) {
        return { success: false, error: "Insufficient diamonds" };
    }
    
    const coinsGained = diamondsToExchange * 2;
    const newDiamonds = userProfile.diamonds - diamondsToExchange;
    const newCoins = userProfile.coins + coinsGained;

    return updateUserProfile(userId, { diamonds: newDiamonds, coins: newCoins });
};

export const buyFrame = async (userId: string, frameId: string, framePrice: number): Promise<ServiceResult<UserProfile>> => {
    const userRef = doc(db, "users", userId);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
        return { success: false, error: "User not found" };
    }
    const userProfile = docSnap.data() as UserProfile;

    if (userProfile.coins < framePrice) {
        return { success: false, error: "Insufficient coins" };
    }

    const newCoins = userProfile.coins - framePrice;
    const newFrames = [...(userProfile.frames || []), frameId];

    return updateUserProfile(userId, { coins: newCoins, frames: newFrames });
};

export const equipFrame = async (userId: string, frameId: string): Promise<ServiceResult<UserProfile>> => {
    const userRef = doc(db, "users", userId);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
        return { success: false, error: "User not found" };
    }
    const userProfile = docSnap.data() as UserProfile;

    if (!userProfile.frames?.includes(frameId)) {
        return { success: false, error: "Frame not owned" };
    }

    return updateUserProfile(userId, { currentFrame: frameId });
};

export const buyVipTier = async (userId: string, tierId: 'baron' | 'duke' | 'prince' | 'shogun', tierPrice: number): Promise<ServiceResult<UserProfile>> => {
    const userRef = doc(db, "users", userId);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
        return { success: false, error: "User not found" };
    }
    const userProfile = docSnap.data() as UserProfile;
    
    if (userProfile.coins < tierPrice) {
        return { success: false, error: "Insufficient coins" };
    }

    const newCoins = userProfile.coins - tierPrice;
    const newVipExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days validity

    return updateUserProfile(userId, { coins: newCoins, vipTier: tierId, vipExpiry: newVipExpiry });
};
