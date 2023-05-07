// @types.users.ts.ts

import { User } from "firebase/auth";

export interface IUserData {
  username?: string;
  email: string;
  password: string;
};

export interface IUser {
  name: string;
  profilePics: string;
  lastChat: string;
};

export type AuthContextType = {
  currentUser: User | null;
};