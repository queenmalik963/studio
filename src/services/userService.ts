
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

let mockUserProfile: UserProfile = {
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

let mockUser: MockUser = {
    uid: mockUserProfile.id,
    email: 'king@ravewave.com',
    displayName: mockUserProfile.name,
    photoURL: mockUserProfile.avatar,
}

const updateMockUser = (profile: UserProfile) => {
    mockUser = {
        uid: profile.id,
        email: mockUser.email, // email doesn't change
        displayName: profile.name,
        photoURL: profile.avatar,
    };
};

// --- Data Accessors ---
export const getMockUserProfile = () => mockUserProfile;
export const getMockUser = () => mockUser;


// --- Service Functions ---
// These functions now simulate real interactions by modifying the in-memory mockUserProfile.

type ServiceResult<T> = { success: boolean; error?: string; updatedProfile?: T };

export const updateUserProfile = async (userId: string, data: Partial<UserProfile>): Promise<ServiceResult<UserProfile>> => {
    if (userId !== mockUserProfile.id) {
        return { success: false, error: "User not found" };
    }
    
    // Update the profile with new data
    mockUserProfile = { ...mockUserProfile, ...data };
    
    // Also update the basic user object if name or avatar changed
    if (data.name || data.avatar) {
        updateMockUser(mockUserProfile);
    }
    
    console.log(`Mock: Updated profile for ${userId}. New profile:`, mockUserProfile);
    return { success: true, updatedProfile: mockUserProfile };
};

export const exchangeDiamondsForCoins = async (userId: string, diamondsToExchange: number): Promise<ServiceResult<UserProfile>> => {
    if (userId !== mockUserProfile.id || mockUserProfile.diamonds < diamondsToExchange) {
        return { success: false, error: "Insufficient diamonds or user not found" };
    }
    
    const coinsGained = diamondsToExchange * 2;
    mockUserProfile.diamonds -= diamondsToExchange;
    mockUserProfile.coins += coinsGained;

    console.log(`Mock: User ${userId} exchanged ${diamondsToExchange} diamonds for ${coinsGained} coins.`);
    return { success: true, updatedProfile: mockUserProfile };
};

export const buyFrame = async (userId: string, frameId: string, framePrice: number): Promise<ServiceResult<UserProfile>> => {
    if (userId !== mockUserProfile.id || mockUserProfile.coins < framePrice) {
        return { success: false, error: "Insufficient coins or user not found" };
    }

    mockUserProfile.coins -= framePrice;
    if (!mockUserProfile.frames) {
        mockUserProfile.frames = [];
    }
    mockUserProfile.frames.push(frameId);

    console.log(`Mock: User ${userId} bought frame ${frameId} for ${framePrice}.`);
    return { success: true, updatedProfile: mockUserProfile };
};

export const equipFrame = async (userId: string, frameId: string): Promise<ServiceResult<UserProfile>> => {
    if (userId !== mockUserProfile.id || !mockUserProfile.frames?.includes(frameId)) {
        return { success: false, error: "Frame not owned or user not found" };
    }

    mockUserProfile.currentFrame = frameId;

    console.log(`Mock: User ${userId} equipped frame ${frameId}.`);
    return { success: true, updatedProfile: mockUserProfile };
};

export const buyVipTier = async (userId: string, tierId: 'baron' | 'duke' | 'prince' | 'shogun', tierPrice: number): Promise<ServiceResult<UserProfile>> => {
    if (userId !== mockUserProfile.id || mockUserProfile.coins < tierPrice) {
        return { success: false, error: "Insufficient coins or user not found" };
    }

    mockUserProfile.coins -= tierPrice;
    mockUserProfile.vipTier = tierId;
    mockUserProfile.vipExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days validity

    console.log(`Mock: User ${userId} bought VIP ${tierId} for ${tierPrice}.`);
    return { success: true, updatedProfile: mockUserProfile };
};

// Mock follow/unfollow, they don't change state for simplicity but could be expanded
export const followUser = async (currentUserId: string, targetUserId: string) => {
    console.log(`Mock: User ${currentUserId} following ${targetUserId}`);
    return { success: true };
};

export const unfollowUser = async (currentUserId: string, targetUserId: string) => {
    console.log(`Mock: User ${currentUserId} unfollowing ${targetUserId}`);
    return { success: true };
};
