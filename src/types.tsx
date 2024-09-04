export interface BlockType {
  id: number;
  type: "text" | "image";
  content: string;
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
  bio: string;
}

export interface ValidationRule {
  field: string;
  message: string;
  validate: (value: string) => boolean | Promise<boolean>;
}

export type FormErrors = Record<string, string>;

export interface AccountData {
  name: string;
  username: string;
  bio: string;
  //blogs: string[];
}
