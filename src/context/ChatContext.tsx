import { createContext, useReducer } from "react";
import chatReducer from "../reducers/chat.reducer";
import { AuxProps } from "../@types/@types.children";
import { ChatActions, ChatContextType } from "../@types/@types.chats";

const INITIAL_STATE: ChatContextType = {
  user: null,
};

export const ChatContext = createContext<{
  state: ChatContextType;
  dispatch: React.Dispatch<ChatActions>;
}>({
  state: INITIAL_STATE,
  dispatch: () => null,
});

export const ChatContextProvider = ({ children }: AuxProps) => {
  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;