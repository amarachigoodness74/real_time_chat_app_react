import React, { useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  getDoc,
  DocumentData,
} from "firebase/firestore";
import Friend from "../Chat/Friend";
import { db } from "../../utils/firebase";
import useCurrentUser from "../../hooks/useCurrentUser";
import styles from "./Modal.module.scss";

interface ModalProp {
  setModalOpen: React.Dispatch<React.SetStateAction<Boolean>>;
}

export default function AddFriendModal({ setModalOpen }: ModalProp) {
  const { currentUser } = useCurrentUser();
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState<DocumentData[] | []>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setError(null);
        setUsers([...users, doc.data()]);
      });
    } catch (err) {
      setError("User not found!!!");
    }
  };

  const handleKey = (e: { code: string }) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async (user: DocumentData) => {
    if (user && currentUser) {
      if (user.uid === currentUser.uid) {
        setError("Not allowed!!!");
        return;
      }

      try {
        //check whether the group(chats in firestore) exists, if not create
        const current_userFriend = `${currentUser.uid}-${user.uid}`;
        const friendCurrent_user = `${user.uid}-${currentUser.uid}`;
        const res = await getDoc(doc(db, "chats", current_userFriend));
        const res2 = await getDoc(doc(db, "chats", friendCurrent_user));

        if (!res.exists() && !res2.exists()) {
          await setDoc(doc(db, "chats", current_userFriend), { messages: [] });

          // Update friends doc for both newly made friends
          await updateDoc(doc(db, "friends", currentUser.uid), {
            [current_userFriend]: {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL,
              lastChat: null,
            },
          });
          await updateDoc(doc(db, "friends", user.uid), {
            [friendCurrent_user]: {
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
              lastChat: null,
            },
          });
        } else {
          setError("User is already friends with you");
        }
      } catch (err) {
        setError("Something went wrong!!!");
      }

      setUsers([]);
      setUsername("");
    }
  };

  return (
    <div className={styles.ModalBackground}>
      <div className={styles.ModalContainer}>
        <div className={styles.ModalHeading}>
          <h2 className={styles.Title}>Add Friend</h2>
          <button
            onClick={() => {
              setModalOpen(false);
            }}
            className={styles.CloseBtn}
          >
            X
          </button>
        </div>
        <div className={styles.Search}>
          <input
            id="searchFriend"
            type="text"
            value={username}
            placeholder="Search for friend..."
            onKeyDown={handleKey}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="searchFriend" onClick={handleSearch}>
            <i className="fa fa-search" aria-hidden="true"></i>
          </label>
        </div>
        <div className={styles.Body}>
          {error && <span className={styles.Error}>{error}</span>}
          {!error &&
            users.length > 0 &&
            users.map((user) => (
              <div onClick={() => handleSelect(user)}>
                <Friend friend={user} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
