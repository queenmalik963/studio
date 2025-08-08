
// This file is now fully static. It does not perform any real operations.
// It's kept for structural consistency but could be removed if components
// no longer import from it.

// Mock sign up
export const signUpWithEmail = () => {
    console.log("Mock sign up initiated. Returning success.");
    return { success: true };
};

// Mock sign in
export const signInWithEmail = () => {
    console.log("Mock sign in initiated. Returning success.");
    return { success: true };
};

// Mock Google sign in
export const signInWithGoogleProvider = () => {
    console.log("Mock Google sign in initiated. Returning success.");
    return { success: true };
};

// Mock sign out
export const signOutUser = () => {
    console.log("Mock sign out initiated. Returning success.");
    return { success: true };
};
