import React from "react";
import { IUser } from "../../@types/@types.users";
import styles from "../../styles/Chat.module.scss";
import Friend from "./Friend";

type FriendsListProps = {
  users: IUser[];
};

export default function FriendsList({ users }: FriendsListProps) {
  return (
    <div className={styles.Contacts}>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li className={styles.Contact} key={user.id}>
              <Friend user={user} />
            </li>
          ))}
        </ul>
      ) : (
        <span className={styles.NoContacts}>You have no friend yet.</span>
      )}
    </div>
  );
}
