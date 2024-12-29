import { ReactNode } from "react";

export type ImageData = { type: "file" | "url"; value: File | string };

export interface ModalProps {
  show: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface SignUpData extends SignInData {
  name: string;
  username: string;
}

export interface ProfileData extends Omit<SignUpData, "password"> {
  _id: string;
  bio: string;
  profileImage: string;
}

export interface ValidationRule {
  field: string;
  message: string;
  validate: (value: string) => boolean | Promise<boolean>;
}

export type FormErrors = Record<string, string>;

export interface ProjectInputData {
  title: string;
  tags: string[];
  links: {
    name: string;
    url: string;
  }[];
  images?: File[];
  description: string;
}

export interface ProjectRespondData extends Omit<ProjectInputData, "images"> {
  _id: string;
  authorUsername: string;
  authorId: string;
  hypeCount: number;
  imageUrls: string[];
  authorProfileImage?: string;
}

export interface ProjectExistingData extends ProjectInputData {
  imageUrls?: string[];
  _id?: string;
  imageBucketId: string;
}

export interface ProjectResquestData extends Omit<ProjectInputData, "images"> {
  imageUrls: string[];
  imageBucketId: string;
}

export interface CardData {
  _id: string;
  title: string;
  authorUsername: string;
  tags: string[] | null;
  authorId: string;
  authorProfileImage?: string;
  hypeCount?: number;
  onRemove?: (_id: string) => void;
  imageUrls?: string[];
}

export interface Tab {
  title: string;
  content: ReactNode;
  active?: boolean;
  disabled?: boolean;
}
