import React from "react";
import { IUser } from "../../@types/@types.users";
import styles from "../../styles/Chat.module.scss";
import Friend from "./Friend";

type FriendsListProps = {
  friends: IUser[];
};

export default function FriendsList({ friends }: FriendsListProps) {
  return (
    <div className={styles.Contacts}>
      {friends.length > 0 ? (
        <ul>
          {friends.map((friend) => (
            <li className={styles.Contact} key={friend.id}>
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
