import React, { useContext, useEffect } from "react";
import { IUser } from "../../@types/@types.users";
import styles from "../../styles/Chat.module.scss";
import Friend from "./Friend";
import { ChatContext } from "../../context/ChatContext";
import { ChatActionKind } from "../../@types/@types.chats";

type FriendsListProps = {
  friends: IUser[];
};

export default function FriendsList({ friends }: FriendsListProps) {
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    if (friends.length > 0) {
      dispatch({
        type: ChatActionKind.CHANGE_FRIEND,
        payload: { user: friends[0] },
      });
    }
  }, [dispatch, friends]);

  return (
    <div className={styles.Contacts}>
      {friends.length > 0 ? (
        <ul>
          {friends.map((friend) => (
            <li
              className={styles.Contact}
              key={friend.uid}
              onClick={() => {
                dispatch({
                  type: ChatActionKind.CHANGE_FRIEND,
                  payload: { user: friend },
                });
              }}
            >
              <Friend friend={friend} />
            </li>
          ))}
        </ul>
      ) : (
        <span className={styles.NoContacts}>You have no friend yet.</span>
      )}
    </div>
  );
}
