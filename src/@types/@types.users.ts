// @types.users.ts
import { User } from "firebase/auth";

export interface IUserData {
  username?: string;
  email: string;
  password: string;
  displayImg?: any;
};

export interface IUser {
  id: number;
  name: string;
  profilePics: string;
  lastChat: string;
};

export type AuthContextType = {
  currentUser: User | null;
};