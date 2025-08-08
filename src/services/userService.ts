
// This file has been modified to remove all Firebase dependencies.
// The functions now return mocked success states or data to allow UI flow.

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
    vipTier?: 'baron' | 'duke' | 'prince' | 'shogun' | null;
    vipExpiry?: any; // Can be Date or string for mock
}


// Function to update a user's profile
export const updateUserProfile = async (userId: string, data: Partial<UserProfile>): Promise<{ success: boolean, error?: string }> => {
    console.log(`Mock updating profile for ${userId} with`, data);
    return { success: true };
};

// Function to follow a user
export const followUser = async (currentUserId: string, targetUserId: string): Promise<{ success: boolean, error?: string }> => {
    console.log(`Mock user ${currentUserId} following ${targetUserId}`);
    return { success: true };
};

// Function to unfollow a user
export const unfollowUser = async (currentUserId: string, targetUserId: string): Promise<{ success: boolean, error?: string }> => {
    console.log(`Mock user ${currentUserId} unfollowing ${targetUserId}`);
    return { success: true };
};

// Function to exchange diamonds for coins
export const exchangeDiamondsForCoins = async (userId: string, diamondsToExchange: number): Promise<{ success: boolean; error?: string }> => {
    console.log(`Mock user ${userId} exchanging ${diamondsToExchange} diamonds`);
    // In a real app, you'd check against actual user data.
    if (10000 < diamondsToExchange) { // Assuming a mock high value
        return { success: false, error: "Insufficient mock diamonds." };
    }
    return { success: true };
};

// Function to buy a frame
export const buyFrame = async (userId: string, frameId: string, framePrice: number): Promise<{ success: boolean, error?: string }> => {
    console.log(`Mock user ${userId} buying frame ${frameId} for ${framePrice}`);
     if (100000 < framePrice) { // Assuming a mock high value
        return { success: false, error: "Insufficient mock coins." };
    }
    return { success: true };
};

// Function to equip a frame
export const equipFrame = async (userId: string, frameId: string): Promise<{ success: boolean, error?: string }> => {
     console.log(`Mock user ${userId} equipping frame ${frameId}`);
    return { success: true };
};

// Function to buy a VIP tier
export const buyVipTier = async (userId: string, tierId: string, tierPrice: number): Promise<{ success: boolean, error?: string }> => {
    console.log(`Mock user ${userId} buying VIP ${tierId} for ${tierPrice}`);
     if (100000 < tierPrice) { // Assuming a mock high value
        return { success: false, error: "Insufficient mock coins." };
    }
    return { success: true };
};
