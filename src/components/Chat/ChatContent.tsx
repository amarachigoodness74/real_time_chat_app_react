import React, { useContext, useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import useCurrentUser from "../../hooks/useCurrentUser";
import {
  Timestamp,
  arrayUnion,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../utils/firebase";
import { ChatContext } from "../../context/ChatContext";
import styles from "../../styles/Chat.module.scss";

export default function ChatContent() {
  const { currentUser } = useCurrentUser();
  const { state } = useContext(ChatContext);

  const [chatId, setChatId] = useState<string | null>(null);
  const [chats, setChats] = useState<any>(null);
  const [newMessage, setNewMessage] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [photoUploadState, setUploadState] = useState<null | string>(null);

  const friend = state.user;

  const handleSend = async () => {
    if (currentUser && friend) {
      const date = new Date().getTime();
      if (chatId) {
        if (image) {
          const storageRef = ref(storage, `${chatId}-${date}`);
          const uploadTask = uploadBytesResumable(storageRef, image);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress = (
                (snapshot.bytesTransferred / snapshot.totalBytes) *
                100
              ).toFixed(0);
              setUploadState("Upload is " + progress + "% done");
              if (Number(progress) === 100) {
                setUploadState(null);
              }
            },
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
      }

      const current_userFriend = `${currentUser.uid}-${friend.uid}`;
      const friendCurrent_user = `${friend.uid}-${currentUser.uid}`;

      await updateDoc(doc(db, "friends", currentUser.uid), {
        [current_userFriend + ".lastChat"]: newMessage,
        [current_userFriend + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "friends", friend.uid), {
        [friendCurrent_user + ".lastChat"]: newMessage,
        [friendCurrent_user + ".date"]: serverTimestamp(),
      });

      setNewMessage("");
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
        if (res.data()) {
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
      <>
        {friend && (
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
        )}
        {friend && chats && chats.messages.length > 0 && (
          <div className={styles.Messages}>
            <ul>
              {currentUser &&
                chats.messages.map((message: any) => (
                  <React.Fragment key={message.uid}>
                    {message.img && (
                      <li
                        className={
                          message.senderId === currentUser.uid
                            ? styles.Sent
                            : styles.Replies
                        }
                      >
                        <img
                          src={message.img}
                          alt={message.text}
                          width="80px"
                          height={"80px"}
                          className={styles.uploads}
                        />
                      </li>
                    )}
                    <li
                      className={
                        message.senderId === currentUser.uid
                          ? styles.Sent
                          : styles.Replies
                      }
                    >
                      <img
                        src={
                          (message.senderId === currentUser.uid
                            ? currentUser.photoURL
                            : friend.photoURL) || ""
                        }
                        alt={
                          (message.senderId === currentUser.uid
                            ? currentUser.displayName
                            : friend.displayName) || ""
                        }
                      />
                      <p>{message.text}</p>
                    </li>
                  </React.Fragment>
                ))}
            </ul>
          </div>
        )}
      </>
      <div className={styles.MessageInput}>
        {error && <p className={styles.Error}>{error}</p>}
        {photoUploadState && (
          <p className="text-green-500 text-sm">{photoUploadState}</p>
        )}
        {image && (
          <div className={styles.messageImage}>
            <img
              src={URL.createObjectURL(image)}
              alt="New message attachment"
            />
            <span onClick={() => setImage(null)}>x</span>
          </div>
        )}
        <div className={styles.Wrap}>
          <input
            type="text"
            placeholder="Write your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <label className={styles.PhotoLabel} htmlFor="attachment">
            <input
              id="attachment"
              name="attachment"
              type="file"
              accept="image/*"
              hidden
              onChange={(e: any) => {
                if (e.target.files && e.target.files[0]) {
                  setImage(e.currentTarget.files?.[0] || null);
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
