import { ReactNode } from "react";

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
  images: File[];
  description: string;
}

export interface ProjectRespondData extends Omit<ProjectInputData, "images"> {
  _id: string;
  authorUsername: string;
  authorId: string;
  hypeCount: number;
  images: string[];
}

export interface ProjectResquestData extends Omit<ProjectInputData, "images"> {
  imageUrls: string[];
}

export interface CardData {
  _id: string;
  title: string;
  authorUsername: string;
  tags: string[] | null;
  authorId: string;
  hypeCount?: number;
}

export interface Tab {
  title: string;
  content: ReactNode;
  active?: boolean;
  disabled?: boolean;
}
