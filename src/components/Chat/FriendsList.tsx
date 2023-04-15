import React from "react";
import { IUser } from "../../types/users";
import styles from "../../styles/Chat.module.scss";

type FriendsListProps = {
  users: IUser[]
}

export default function FriendsList({ users }: FriendsListProps) {
  return (
    <div className={styles.Contacts}>
      <ul>
        {users.map((user) => (
          <li className={styles.Contact}>
            <div className={styles.Wrap}>
              {/* <span className="contact-status online"></span> */}
              <span className={styles.ContactStatus}></span>
              <img src={user.profilePics} alt="" />
              <div className={styles.Meta}>
                <p className={styles.Name}>{user.name}</p>
                <p className={styles.Preview}>{user.lastChat}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
