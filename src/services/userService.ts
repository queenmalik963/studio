
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


// Function to update a user's profile
export const updateUserProfile = async (userId: string, data: Partial<UserProfile>): Promise<{ success: boolean, error?: string }> => {
    console.log(`Mock updating profile for ${userId} with`, data);
    return { success: true };
};


// Function to get a user's profile once
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
    console.log(`Mock fetching profile for ${userId}`);
    return mockUserProfile;
};

// Function to listen to real-time updates on a user's profile
export const listenToUserProfile = (userId: string, callback: (profile: UserProfile | null) => void) => {
    console.log(`Mock listening to profile for ${userId}`);
    callback(mockUserProfile);
    return () => console.log(`Stopped listening to mock profile for ${userId}`);
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
    if (mockUserProfile.diamonds < diamondsToExchange) {
        return { success: false, error: "Insufficient mock diamonds." };
    }
    return { success: true };
};

// Function to buy a frame
export const buyFrame = async (userId: string, frameId: string, framePrice: number): Promise<{ success: boolean, error?: string }> => {
    console.log(`Mock user ${userId} buying frame ${frameId} for ${framePrice}`);
    if (mockUserProfile.coins < framePrice) {
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
     if (mockUserProfile.coins < tierPrice) {
        return { success: false, error: "Insufficient mock coins." };
    }
    return { success: true };
};
