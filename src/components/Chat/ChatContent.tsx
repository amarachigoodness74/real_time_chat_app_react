import React, { useEffect, useState } from "react";
import styles from "../../styles/Chat.module.scss";
import useCurrentUser from "../../hooks/useCurrentUser";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../utils/firebase";

export default function ChatContent({ user }: any) {
  const currentUser = useCurrentUser();
  const [chats, setChats] = useState<any>([]);

  useEffect(() => {
    const getChats = async () => {
      if (currentUser && user) {
        const res = await getDoc(doc(db, "usersChats", `${currentUser.uid}-${user.uid}`));
        const res2 = await getDoc(
          doc(db, "usersChats", `${user.uid}-${currentUser.uid}`)
        );
        console.log('res', res);
        console.log('res2', res2);
        // return () => {
        //   getUserFriendsChats();
        // };
      }
    };

    currentUser?.uid && getChats();
  }, [currentUser?.uid]);

  return (
    <>
      <div className={styles.ContactProfile}>
        <div className={styles.FriendProfile}>
          <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
          <p>Harvey Specter</p>
        </div>
        <div className={styles.ChatOptions}>
          <span className={styles.StatusBtn}>
            <i className="fa fa-video-camera"></i>
          </span>
          <span className={styles.StatusBtn}>
            <i className="fa fa-phone"></i>
          </span>
        </div>
      </div>
      <div className={styles.Messages}>
        <ul>
          <li className={styles.Sent}>
            <img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />
            <p>
              How the hell am I supposed to get a jury to believe you when I am
              not even sure that I do?!
            </p>
          </li>
          <li className={styles.Replies}>
            <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
            <p>
              When you're backed against the wall, break the god damn thing
              down.
            </p>
          </li>
          <li className={styles.Replies}>
            <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
            <p>Excuses don't win championships.</p>
          </li>
          <li className={styles.Sent}>
            <img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />
            <p>Oh yeah, did Michael Jordan tell you that?</p>
          </li>
          <li className={styles.Replies}>
            <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
            <p>No, I told him that.</p>
          </li>
          <li className={styles.Replies}>
            <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
            <p>What are your choices when someone puts a gun to your head?</p>
          </li>
          <li className={styles.Sent}>
            <img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />
            <p>
              What are you talking about? You do what they say or they shoot
              you.
            </p>
          </li>
          <li className={styles.Replies}>
            <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
            <p>
              Wrong. You take the gun, or you pull out a bigger one. Or, you
              call their bluff. Or, you do any one of a hundred and forty six
              other things.
            </p>
          </li>
        </ul>
      </div>
      <div className={styles.MessageInput}>
        <div className={styles.Wrap}>
          <input type="text" placeholder="Write your message..." />
          <span className={styles.Attachment}>
            <i className="fa fa-paperclip" aria-hidden="true"></i>
          </span>
          <button className="submit">
            <i className="fa fa-paper-plane" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </>
  );
}
