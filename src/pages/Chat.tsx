import React, { useState, KeyboardEvent } from "react";
import Profile from "../components/Chat/Profile";
import Search from "../components/Chat/Search";
import FriendsList from "../components/Chat/FriendsList";
import AddFriend from "../components/Chat/AddFriend";
import ChatContent from "../components/Chat/ChatContent";
import { IUser } from "../@types/@types.users";
import styles from "../styles/Chat.module.scss";

const users: IUser[] = [
  {
    id: 1,
    name: "Louis Litt",
    profilePics: "http://emilcarlsson.se/assets/louislitt.png",
    lastChat: "You just got LITT up, Mike.",
  },
  {
    id: 2,
    name: "Harvey Specter",
    profilePics: "http://emilcarlsson.se/assets/harveyspecter.png",
    lastChat:
      "Wrong. You take the gun, or you pull out a bigger one. Or you call their bluff. Or, you do any one of a hundred and forty six other things.",
  },
  {
    id: 3,
    name: "Rachel Zane",
    profilePics: "http://emilcarlsson.se/assets/rachelzane.png",
    lastChat: "I was thinking that we could have chicken tonight, sounds good?",
  },
  {
    id: 4,
    name: "Donna Paulsen",
    profilePics: "http://emilcarlsson.se/assets/donnapaulsen.png",
    lastChat: "Mike, I know everything! I'm Donna..",
  },
  {
    id: 5,
    name: "Jessica Pearson",
    profilePics: "http://emilcarlsson.se/assets/jessicapearson.png",
    lastChat: "Have you finished the draft on the Hinsenburg deal?",
  },
  {
    id: 6,
    name: "Harold Gunderson",
    profilePics: "http://emilcarlsson.se/assets/haroldgunderson.png",
    lastChat: "Thanks Mike! :)",
  },
  {
    id: 7,
    name: "Daniel Hardman",
    profilePics: "http://emilcarlsson.se/assets/danielhardman.png",
    lastChat: " We'll meet again, Mike. Tell Jessica I said 'Hi'.",
  },
  {
    id: 8,
    name: "Jessica Pearson",
    profilePics: "http://emilcarlsson.se/assets/jessicapearson.png",
    lastChat: "Have you finished the draft on the Hinsenburg deal?",
  },
  {
    id: 9,
    name: "Harold Gunderson",
    profilePics: "http://emilcarlsson.se/assets/haroldgunderson.png",
    lastChat: "Thanks Mike! :)",
  },
  {
    id: 10,
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
