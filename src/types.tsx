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
  links: string[];
  images: File[];
  description: string;
}

export interface ProjectData extends ProjectInputData {
  _id: string;
  authorUsername: string;
  authorId: string;
  hypeCount: number;
}

export interface CardData {
  _id: string;
  title: string;
  authorUsername: string;
  tags: string[] | null;
}
