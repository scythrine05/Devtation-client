import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
  deleteUser,
} from "firebase/auth";
import { auth } from "/src/configs/firebase";

import { saveToken, logoutUser, createUser, removeUserById } from "./custom";
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
    const _id_token_ = await user.getIdToken();
    if (user) {
      await updateProfile(user, { displayName: name });
    }
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
    const response = await saveToken(_id_token_);
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
    const userData = {
      email,
      password: "",
      name: user.displayName || "",
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
    const userData = {
      email,
      password: "",
      name: user.displayName || "",
      username: email?.split("@")[0],
    };
    const _id_token_ = await user.getIdToken();
    const response = await createUser(userData, _id_token_);
    return response;
  } catch (error) {
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  const user = auth.currentUser;
  try {
    await signOut(auth);
    await logoutUser(user);
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
    await removeUserById(user); // Remove from Database
    await deleteUser(user); // Remove from Firebase Authentication
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const reauthenticate = async (user: User, password: string) => {
  const email = user.email!;
  if (!password) throw new Error("Password is required for re-authentication");
  const credential = EmailAuthProvider.credential(email, password);
  await reauthenticateWithCredential(user, credential);
};
