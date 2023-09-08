import React from "react";
import { DocumentData } from "firebase/firestore";
import { IUser } from "../../@types/@types.users";
import styles from "../../styles/Chat.module.scss";

interface FriendProps {
  friend: IUser | DocumentData;
}

export default function Friend({ friend }: FriendProps) {
  return (
    <div className={styles.FriendWrap}>
      {/* <span className="contact-status online"></span> */}
      <span className={styles.ContactStatus}></span>
      <img src={friend.photoURL} alt="" />
      <div className={styles.Meta}>
        <p className={styles.Name}>{friend.displayName}</p>
        {friend.lastChat && <p className={styles.Preview}>{friend.lastChat}</p>}
      </div>
    </div>
  );
}
