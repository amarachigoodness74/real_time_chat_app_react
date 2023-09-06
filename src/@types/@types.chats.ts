// @types.chats.ts
import { User } from "firebase/auth";
import { IUser } from "./@types.users";

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      }
};

enum ChatActionKind {
  CHANGE_FRIEND = 'CHANGE_FRIEND'
}

export type ChatContextType = {
  user: User | null;
};

type ChatPayload = {
  [ChatActionKind.CHANGE_FRIEND] : IUser;
}

export type ChatActions = ActionMap<ChatPayload>[keyof ActionMap<ChatPayload>];
