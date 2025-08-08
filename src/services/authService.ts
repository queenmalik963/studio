// This file has been modified to remove all Firebase dependencies.
// The functions now return a mocked success state to allow UI flow.

// Mock sign up with email and password
export const signUpWithEmail = async (email: string, password: string) => {
    console.log(`Mock sign up for ${email}`);
    // Simulate a successful sign-up
    return { success: true, user: { uid: 'mock_uid' }, error: null, code: null };
};

// Mock sign in with email and password
export const signInWithEmail = async (email: string, password: string) => {
    console.log(`Mock sign in for ${email}`);
    // Simulate a successful sign-in
    return { success: true, user: { uid: 'mock_uid' }, error: null, code: null };
};

// Mock sign in with Google
export const signInWithGoogleProvider = async () => {
    console.log('Mock Google sign in');
    // Simulate a successful sign-in
    return { success: true, user: { uid: 'mock_uid' }, error: null, code: null };
};

// Mock sign out
export const signOutUser = async () => {
    console.log('Mock sign out');
    // Simulate a successful sign-out
    return { success: true, error: null };
};
