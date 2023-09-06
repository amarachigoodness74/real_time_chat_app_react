import React, { useState, KeyboardEvent, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import Profile from "../components/Chat/Profile";
import Search from "../components/Chat/Search";
import FriendsList from "../components/Chat/FriendsList";
import AddFriend from "../components/Chat/AddFriend";
import ChatContent from "../components/Chat/ChatContent";
import { db } from "../utils/firebase";
import useCurrentUser from "../hooks/useCurrentUser";
import { IUser } from "../@types/@types.users";
import styles from "../styles/Chat.module.scss";

export default function Chat() {
  const currentUser = useCurrentUser();
  const [searchField, setSearchField] = useState("");
  const [friends, setFriends] = useState<IUser[] | []>([]);
  const [currentChat, setCurrentChat] = useState<IUser | null>(friends[0]);

  useEffect(() => {
    const getFriends = () => {
      if (currentUser) {
        const getUserFriends = onSnapshot(
          doc(db, "friends", currentUser.uid),
          (doc: any) => {
            setFriends(Object.values(doc.data()));
          }
        );
        return () => {
          getUserFriends();
        };
      }
    };

    currentUser?.uid && getFriends();
  }, [currentUser, currentUser?.uid]);

  const handleSearch = (e: KeyboardEvent<HTMLInputElement>) =>
    setSearchField(() => (e.target as HTMLInputElement).value.toLowerCase());
  const filteredUsers =
    searchField === ""
      ? friends
      : friends.filter((friend) =>
          friend.displayName.toLowerCase().includes(searchField)
        );

  return (
    <section>
      <div className={styles.Container}>
        <div className={styles.SidePanel}>
          <Profile />
          {filteredUsers.length > 2 && <Search handleSearch={handleSearch} />}
          <FriendsList friends={filteredUsers} />
          <p className={styles.Spacer}></p>
          <AddFriend />
        </div>
        <div className={styles.ChatContent}>
          <ChatContent />
        </div>
      </div>
    </section>
  );
}
