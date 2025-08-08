
// This file provides types and mock functions for user-related actions.
// All mock data has been removed to prevent client-side errors and allow for dynamic content.

// NOTE: The primary UserProfile type is now defined and managed in AuthContext.

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
