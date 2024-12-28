import { ChatContextType } from "../@types/@types.chats";

const chatReducer = (state: ChatContextType, action: any) => {
  switch (action.type) {
    case "CHANGE_FRIEND":
      return {
        ...state,
        user: action.payload.user,
      };

    default:
      return state;
  }
};

export default chatReducer;
