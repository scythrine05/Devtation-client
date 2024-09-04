export const signInError = (error: unknown): string => {
  if (error instanceof Error && "code" in error) {
    const firebaseError = error as { code: string };
    switch (firebaseError.code) {
      case "auth/invalid-credential":
        return "Invalid credentials";
      case "auth/user-not-found":
        return "Email does not exist";
      case "auth/wrong-password":
        return "Invalid password";
      default:
        return "Sign-in failed. Please try again.";
    }
  } else {
    return "An unknown error occurred.";
  }
};
