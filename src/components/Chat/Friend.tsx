import React from "react";
import { DocumentData } from "firebase/firestore";
import { IUser } from "../../@types/@types.users";
import styles from "../../styles/Chat.module.scss";

interface FriendProps {
  user: IUser | DocumentData;
}

export default function Friend({ user }: FriendProps) {
  return (
    <div className={styles.FriendWrap}>
      {/* <span className="contact-status online"></span> */}
      <span className={styles.ContactStatus}></span>
      <img src={user.photoURL} alt="" />
      <div className={styles.Meta}>
        <p className={styles.Name}>{user.displayName}</p>
        <p className={styles.Preview}>{user.lastChat}</p>
        {user.lastChat && <p className={styles.Preview}>{user.lastChat}</p>}
      </div>
    </div>
  );
}
