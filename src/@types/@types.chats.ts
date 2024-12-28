// @types.chats.ts
import { IUser } from "./@types.users";

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum ChatActionKind {
  CHANGE_FRIEND = "CHANGE_FRIEND",
}

export type ChatContextType = {
  user: IUser | null;
};

type ChatPayload = {
  [ChatActionKind.CHANGE_FRIEND]: {
    user: IUser | null;
  };
};

export type ChatActions = ActionMap<ChatPayload>[keyof ActionMap<ChatPayload>];
