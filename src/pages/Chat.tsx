import React, { useState, KeyboardEvent } from "react";
import Profile from "../components/Chat/Profile";
import Search from "../components/Chat/Search";
import FriendsList from "../components/Chat/FriendsList";
import { IUser } from "../@types/@types.users.ts";
import AddFriend from "../components/Chat/AddFriend";
import ChatContent from "../components/Chat/ChatContent";
import styles from "../styles/Chat.module.scss";

const users: IUser[] = [
  {
    name: "Louis Litt",
    profilePics: "http://emilcarlsson.se/assets/louislitt.png",
    lastChat: "You just got LITT up, Mike.",
  },
  {
    name: "Harvey Specter",
    profilePics: "http://emilcarlsson.se/assets/harveyspecter.png",
    lastChat:
      "Wrong. You take the gun, or you pull out a bigger one. Or you call their bluff. Or, you do any one of a hundred and forty six other things.",
  },
  {
    name: "Rachel Zane",
    profilePics: "http://emilcarlsson.se/assets/rachelzane.png",
    lastChat: "I was thinking that we could have chicken tonight, sounds good?",
  },
  {
    name: "Donna Paulsen",
    profilePics: "http://emilcarlsson.se/assets/donnapaulsen.png",
    lastChat: "Mike, I know everything! I'm Donna..",
  },
  {
    name: "Jessica Pearson",
    profilePics: "http://emilcarlsson.se/assets/jessicapearson.png",
    lastChat: "Have you finished the draft on the Hinsenburg deal?",
  },
  {
    name: "Harold Gunderson",
    profilePics: "http://emilcarlsson.se/assets/haroldgunderson.png",
    lastChat: "Thanks Mike! :)",
  },
  {
    name: "Daniel Hardman",
    profilePics: "http://emilcarlsson.se/assets/danielhardman.png",
    lastChat: " We'll meet again, Mike. Tell Jessica I said 'Hi'.",
  },
  {
    name: "Jessica Pearson",
    profilePics: "http://emilcarlsson.se/assets/jessicapearson.png",
    lastChat: "Have you finished the draft on the Hinsenburg deal?",
  },
  {
    name: "Harold Gunderson",
    profilePics: "http://emilcarlsson.se/assets/haroldgunderson.png",
    lastChat: "Thanks Mike! :)",
  },
  {
    name: "Daniel Hardman",
    profilePics: "http://emilcarlsson.se/assets/danielhardman.png",
    lastChat: " We'll meet again, Mike. Tell Jessica I said 'Hi'.",
  },
];

function Chat() {
  const [searchField, setSearchField] = useState("");

  const handleSearch = (e: KeyboardEvent<HTMLInputElement>) =>
    setSearchField(() => (e.target as HTMLInputElement).value.toLowerCase());
  const filteredUsers =
    searchField === ""
      ? users
      : users.filter((user) => user.name.toLowerCase().includes(searchField));

  return (
    <section>
      <div className={styles.Container}>
        <div className={styles.SidePanel}>
          <Profile />
          <Search handleSearch={handleSearch} />
          <FriendsList users={filteredUsers} />
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

export default Chat;
