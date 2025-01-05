import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  reauthenticateWithPopup,
  reauthenticateWithCredential,
  updateProfile,
  OAuthProvider,
  AuthCredential,
  EmailAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
  deleteUser,
} from "firebase/auth";
import { auth } from "/src/configs/firebase";

import {
  setToken,
  logoutUser,
  createUser,
  removeUserById,
  deleteAllProjectsByUserId,
} from "./custom";
import { SignInData, SignUpData } from "/src/types";

export const signUpWithEmail = async (userData: SignUpData) => {
  const { email, password, name } = userData;
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const displayName = name;
    await updateUserDisplayName(user, displayName);
    const _id_token_ = await user.getIdToken();
    const response = await createUser(userData, _id_token_);
    return response;
  } catch (error) {
    throw error;
  }
};

export const signInWithEmail = async (userData: SignInData) => {
  const { email, password } = userData;
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const _id_token_ = await userCredential.user.getIdToken();
    const response = await setToken(_id_token_);
    return response;
  } catch (error) {
    throw error;
  }
};

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const email = user.email || "";
    const displayName = user.displayName;
    await updateUserDisplayName(user, displayName);
    const userData = {
      email,
      password: "",
      name: displayName || "",
      username: email?.split("@")[0],
    };
    const _id_token_ = await user.getIdToken();
    const response = await createUser(userData, _id_token_);
    return response;
  } catch (error) {
    throw error;
  }
};

export const signInWithGitHub = async () => {
  const provider = new GithubAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const email = user.email || "";
    const displayName = user.displayName;
    await updateUserDisplayName(user, displayName);
    const userData = {
      email,
      password: "",
      name: displayName || "",
      username: email?.split("@")[0],
    };
    const _id_token_ = await user.getIdToken();
    const response = await createUser(userData, _id_token_);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateUserDisplayName = async (
  user: User | null,
  displayName: string | null
) => {
  if (user && user.displayName !== displayName) {
    try {
      await updateProfile(user, { displayName });
    } catch (error) {
      throw error;
    }
  }
};

export const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
    await logoutUser();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteAccount = async (): Promise<void> => {
  const user: User | null = auth.currentUser;
  if (!user) {
    console.error("No user is currently signed in.");
    return;
  }
  try {
    await deleteAllProjectsByUserId(user); // Delete all User Projects
    await removeUserById(user); // Remove from Database
    await deleteUser(user); // Remove from Firebase Authentication
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const reauthenticate = async (
  user: User,
  method: string,
  password?: string
) => {
  const email = user.email!;

  if (!user) {
    throw new Error("No user is currently logged in.");
  }

  try {
    let credential;

    switch (method) {
      case "password":
        if (!email || !password) {
          throw new Error("Empty Fields");
        }
        credential = EmailAuthProvider.credential(
          email,
          password
        ) as AuthCredential;
        break;

      case "google.com":
        const googleProvider = new OAuthProvider("google.com");
        const googleResult = await reauthenticateWithPopup(
          user,
          googleProvider
        );
        credential = OAuthProvider.credentialFromResult(
          googleResult
        ) as AuthCredential;
        break;

      case "github.com":
        const githubProvider = new OAuthProvider("github.com");
        const githubResult = await reauthenticateWithPopup(
          user,
          githubProvider
        );
        credential = OAuthProvider.credentialFromResult(
          githubResult
        ) as AuthCredential;
        break;

      default:
        throw new Error("Unsupported reauthentication method.");
    }

    // Reauthenticate with the credential
    const result = await reauthenticateWithCredential(user, credential);
    return result;
  } catch (err) {
    throw new Error("Invalid credentials");
  }
};
