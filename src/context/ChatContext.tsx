import { createContext, useReducer } from "react";
import { AuxProps } from "../@types/@types.children";
import { ChatContextType } from "../@types/@types.chats";

const INITIAL_STATE: ChatContextType = {
  user: null,
};

export const ChatContext = createContext<{
  state: ChatContextType;
  dispatch: React.Dispatch<any>;
}>({
  state: INITIAL_STATE,
  dispatch: () => null,
});

const chatReducer = (state: ChatContextType, action: { type: any; payload: any; }) => {
  switch (action.type) {
    case "CHANGE_FRIEND":
      return {
        user: action.payload
      };

    default:
      return state;
  }
};

const ChatContextProvider = ({ children }: AuxProps) => {
  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
