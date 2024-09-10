export interface SignInData {
  email: string;
  password: string;
}

export interface SignUpData extends SignInData {
  name: string;
  username: string;
}

export interface ProfileData extends Omit<SignUpData, "password"> {
  bio: string;
}

export interface ValidationRule {
  field: string;
  message: string;
  validate: (value: string) => boolean | Promise<boolean>;
}

export type FormErrors = Record<string, string>;

export interface AccountData {
  _id: string;
  name: string;
  username: string;
  bio: string;
  //blogs: string[];
}

export interface ProjectData {
  _id: string;
  title: string;
  tags: string[];
  links: string[];
  images: File[];
  description: string;
}

export interface CardData {
  _id: string;
  title: string;
  author: string;
  tags: string[] | null;
}
