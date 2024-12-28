import React, { useState } from "react";
import AddFriendModal from "../AddFriendModal";
import styles from "../../styles/Chat.module.scss";

export default function AddFriend() {
  const [modalOpen, setModalOpen] = useState<Boolean>(false);
  return (
    <div className={styles.BottomBar}>
      <button
        id="addcontact"
        onClick={() => {
          setModalOpen(true);
        }}
        className={styles.OpenModalBtn}
      >
        <i className="fa fa-user-plus fa-fw" aria-hidden="true"></i>{" "}
        <span className="font-bold">Add contact</span>
      </button>
      {modalOpen && <AddFriendModal setModalOpen={setModalOpen} />}
    </div>
  );
}
