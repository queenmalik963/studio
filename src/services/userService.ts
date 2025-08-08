
// This file provides types and a centralized source for the mock user data.
// This makes the user profile consistent across the entire application.

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

export type MockUser = {
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

// --- Data Accessors ---
export const getMockUserProfile = () => mockUserProfile;
export const getMockUser = () => mockUser;


// All functions below are mocks and do not perform any real action.
// They simply log to the console and return a success state.
export const updateUserProfile = async (userId: string, data: any) => {
    console.log(`Mock: Updating profile for ${userId} with`, data);
    return { success: true };
};

export const followUser = async (currentUserId: string, targetUserId: string) => {
    console.log(`Mock: User ${currentUserId} following ${targetUserId}`);
    return { success: true };
};

export const unfollowUser = async (currentUserId: string, targetUserId: string) => {
    console.log(`Mock: User ${currentUserId} unfollowing ${targetUserId}`);
    return { success: true };
};

export const exchangeDiamondsForCoins = async (userId: string, diamondsToExchange: number) => {
    console.log(`Mock: User ${userId} exchanging ${diamondsToExchange} diamonds`);
    return { success: true };
};

export const buyFrame = async (userId: string, frameId: string, framePrice: number) => {
    console.log(`Mock: User ${userId} buying frame ${frameId} for ${framePrice}`);
    return { success: true };
};

export const equipFrame = async (userId: string, frameId: string) => {
     console.log(`Mock: User ${userId} equipping frame ${frameId}`);
    return { success: true };
};

export const buyVipTier = async (userId: string, tierId: string, tierPrice: number) => {
    console.log(`Mock: User ${userId} buying VIP ${tierId} for ${tierPrice}`);
    return { success: true };
};
