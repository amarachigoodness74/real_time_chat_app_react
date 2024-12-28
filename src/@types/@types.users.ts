// @types.users.ts
import { User } from "firebase/auth";

export interface IUser {
  uid: string;
  email?: string;
  displayName: string;
  photoURL: string;
  lastChat?: string;
  status?: UserStatus;
}

export type AuthContextType = {
  currentUser: User | null;
};

export enum UserStatus {
  online = "Online",
  away = "Away",
  busy = "Busy",
  offline = "Offline",
}

export interface SignupFormValues {
  username: string;
  email: string;
  password: string;
  profilePhoto: File | null;
}

export interface SigninFormValues {
  email: string;
  password: string;
}
