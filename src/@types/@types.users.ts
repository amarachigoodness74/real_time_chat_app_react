// @types.users.ts
import { User } from "firebase/auth";

export interface IAuthData {
  displayName?: string;
  email: string;
  password: string;
  photoURL?: any;
};

export interface IUser {
  uid: string;
  email?: string;
  displayName: string;
  photoURL: string;
  lastChat?: string;
  status?: UserStatus;
};

export type AuthContextType = {
  currentUser: User | null;
};

export enum UserStatus {
  online = 'Online',
  away = 'Away',
  busy = 'Busy',
  offline = 'Offline',
}
