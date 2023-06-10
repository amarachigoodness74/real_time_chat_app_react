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
  const currentUser = useCurrentUser();
  const [username, setUsername] = useState("");
  const [user, setUser] = useState<DocumentData | null>(null);
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
        setUser(doc.data());
      });
    } catch (err) {
      console.log("errrrrrrr", err);
      setError("User not found!!!");
    }
  };

  const handleKey = (e: { code: string }) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    let combinedId;
    if (user && currentUser) {
      combinedId = `${currentUser.uid}-${user.uid}`;

      try {
        const res = await getDoc(doc(db, "usersChats", combinedId));
        const res2 = await getDoc(
          doc(db, "usersChats", `${user.uid}-${currentUser.uid}`)
        );

        if (!res.exists() && !res2.exists()) {
          await setDoc(doc(db, "usersChats", combinedId), { messages: [] });
          await updateDoc(doc(db, "userFriends", currentUser.uid), {
            [combinedId]: {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL,
              lastChat: "",
            },
          });
          await updateDoc(doc(db, "userFriends", user.uid), {
            [combinedId]: {
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
              lastChat: "",
            },
          });
        } else {
          setError("User is already friends with you");
        }
      } catch (err) {
        console.log("err", err);
        setError("Something went wrong!!!");
      }

      setUser(null);
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
          {!error && user && (
            <div onClick={handleSelect}>
              <Friend user={user} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
