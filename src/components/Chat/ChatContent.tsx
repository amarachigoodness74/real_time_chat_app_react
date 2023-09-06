import React, { useContext, useEffect, useState } from "react";
import useCurrentUser from "../../hooks/useCurrentUser";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../utils/firebase";
import styles from "../../styles/Chat.module.scss";
import ChatContext from "../../context/ChatContext";

export default function ChatContent() {
  const { state, dispatch } = useContext(ChatContext);
  const currentUser = useCurrentUser();
  const [chats, setChats] = useState<any>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const friend = state.user;
    const getChats = async () => {
      if (currentUser && friend) {
        //check whether the group(chats in firestore) exists, if not create
        const current_userFriend = `${currentUser.uid}-${friend.uid}`;
        const friendCurrent_user = `${friend.uid}-${currentUser.uid}`;
        const res = await getDoc(doc(db, "chats", current_userFriend));
        const res2 = await getDoc(doc(db, "chats", friendCurrent_user));
        setChats(res.data()|| res2.data());
      }
    };

    currentUser?.uid && getChats();
  }, [currentUser, currentUser?.uid]);

  const friend = state.user;

  return (
    <section>
      {chats.length > 0 ? (
        <>
          <div className={styles.ContactProfile}>
            <div className={styles.FriendProfile}>
              <img src={friend.photoURL} alt={friend.displayName} />
              <p>{friend.displayName}</p>
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
                  How the hell am I supposed to get a jury to believe you when I
                  am not even sure that I do?!
                </p>
              </li>
              <li className={styles.Replies}>
                <img
                  src="http://emilcarlsson.se/assets/harveyspecter.png"
                  alt=""
                />
                <p>
                  When you're backed against the wall, break the god damn thing
                  down.
                </p>
              </li>
              <li className={styles.Replies}>
                <img
                  src="http://emilcarlsson.se/assets/harveyspecter.png"
                  alt=""
                />
                <p>Excuses don't win championships.</p>
              </li>
              <li className={styles.Sent}>
                <img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />
                <p>Oh yeah, did Michael Jordan tell you that?</p>
              </li>
              <li className={styles.Replies}>
                <img
                  src="http://emilcarlsson.se/assets/harveyspecter.png"
                  alt=""
                />
                <p>No, I told him that.</p>
              </li>
              <li className={styles.Replies}>
                <img
                  src="http://emilcarlsson.se/assets/harveyspecter.png"
                  alt=""
                />
                <p>
                  What are your choices when someone puts a gun to your head?
                </p>
              </li>
              <li className={styles.Sent}>
                <img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />
                <p>
                  What are you talking about? You do what they say or they shoot
                  you.
                </p>
              </li>
              <li className={styles.Replies}>
                <img
                  src="http://emilcarlsson.se/assets/harveyspecter.png"
                  alt=""
                />
                <p>
                  Wrong. You take the gun, or you pull out a bigger one. Or, you
                  call their bluff. Or, you do any one of a hundred and forty
                  six other things.
                </p>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <div>Start new chat</div>
      )}
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
    </section>
  );
}
