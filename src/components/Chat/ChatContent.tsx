import React, { useContext, useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import useCurrentUser from "../../hooks/useCurrentUser";
import {
  Timestamp,
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../utils/firebase";
import { ChatContext } from "../../context/ChatContext";
import styles from "../../styles/Chat.module.scss";

export default function ChatContent() {
  const currentUser = useCurrentUser();
  const { state } = useContext(ChatContext);

  const [chatId, setChatId] = useState<string | null>(null);
  const [chats, setChats] = useState<any>([]);
  const [newMessage, setNewMessage] = useState<string | null>(null);
  const [image, setImage] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const friend = state.user;

  const handleSend = async () => {
    if (currentUser && friend && chatId) {
      if (image) {
        const storageRef = ref(storage, `${chatId}-${Timestamp.now()}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (error: any) => {
            console.error("error", error);
            setError("Could not upload file");
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                await updateDoc(doc(db, "chats", chatId), {
                  messages: arrayUnion({
                    text: newMessage,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                    img: downloadURL,
                  }),
                });
              }
            );
          }
        );
      } else {
        await updateDoc(doc(db, "chats", chatId), {
          messages: arrayUnion({
            text: newMessage,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
      }

      await updateDoc(doc(db, "friends", currentUser.uid), {
        [`${currentUser.uid}-${friend.uid}`]: {
          lastChat: newMessage,
        },
      });

      await updateDoc(doc(db, "friends", friend.uid), {
        [`${friend.uid}-${currentUser.uid}`]: {
          lastChat: newMessage,
        },
      });

      setNewMessage(null);
      setImage(null);
    }
  };

  useEffect(() => {
    const friend = state.user;
    const getChats = async () => {
      if (currentUser && friend) {
        //check whether the group(chats in firestore) exists, if not create
        const current_userFriend = `${currentUser.uid}-${friend.uid}`;
        const friendCurrent_user = `${friend.uid}-${currentUser.uid}`;
        const res = await getDoc(doc(db, "chats", current_userFriend));
        if (res) {
          setChats(res.data());
          setChatId(current_userFriend);
        } else {
          const res2 = await getDoc(doc(db, "chats", friendCurrent_user));
          setChats(res2.data());
          setChatId(friendCurrent_user);
        }
      }
    };

    currentUser?.uid && getChats();
  }, [currentUser, currentUser?.uid, state.user]);

  return (
    <section>
      {friend && chats && chats.length > 0 ? (
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
            </ul>
          </div>
        </>
      ) : (
        <div>Start new chat</div>
      )}
      <div className={styles.MessageInput}>
        {error && <p className={styles.Error}>{error}</p>}
        {image && (
          <div className={styles.messageImage}>
            <img
              src={image}
              alt="Profile Avatar"
            />
            <span onClick={() => setImage(null)}>x</span>
          </div>
        )}
        <div className={styles.Wrap}>
          <input
            type="text"
            placeholder="Write your message..."
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <label className={styles.PhotoLabel} htmlFor="photoURL">
            <input
              id="photoURL"
              name="photoURL"
              type="file"
              hidden
              onChange={(e: any) => {
                if (e.target.files && e.target.files[0]) {
                  setImage(URL.createObjectURL(e.target.files[0]));
                } else {
                  setError("Please upload a valid file");
                }
              }}
            />
            <span className={styles.Attachment}>
              <i className="fa fa-paperclip" aria-hidden="true"></i>
            </span>
          </label>
          <button className="submit" onClick={handleSend}>
            <i className="fa fa-paper-plane" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </section>
  );
}
