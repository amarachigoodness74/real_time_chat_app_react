import { ChatContextType } from "../@types/@types.chats";

const chatReducer = (state: ChatContextType, action: any) => {
  switch (action.type) {
    case "CHANGE_FRIEND":
      return {
        user: action.payload
      };

    default:
      return state;
  }
};

export default chatReducer;