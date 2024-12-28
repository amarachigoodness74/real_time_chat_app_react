import React, { useEffect, useState } from "react";
import { DocumentData, doc, onSnapshot } from "firebase/firestore";
import { IUser, UserStatus } from "../../@types/@types.users";
import styles from "../../styles/Chat.module.scss";
import { db } from "../../utils/firebase";

interface FriendProps {
  friend: IUser | DocumentData;
}

export default function Friend({ friend }: FriendProps) {
  const [status, setStatus] = useState<UserStatus>(UserStatus.offline);

  useEffect(() => {
    const getUserData = () => {
      if (friend) {
        const getData = onSnapshot(doc(db, "users", friend.uid), (doc: any) => {
          setStatus(doc.data().status);
        });
        return () => {
          getData();
        };
      }
    };

    friend?.uid && getUserData();
  }, [friend, friend?.uid]);

  return (
    <div className={styles.FriendWrap}>
      <span className={`contact-status ${status}`}></span>
      <span className={styles.ContactStatus}></span>
      <img src={friend.photoURL} alt="" />
      <div className={styles.Meta}>
        <h6 className={styles.Name}>{friend.displayName}</h6>
        {friend.lastChat && <p className={styles.Preview}>{friend.lastChat}</p>}
      </div>
    </div>
  );
}
