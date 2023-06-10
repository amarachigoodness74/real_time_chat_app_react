import React, { useState } from "react";
import styles from "../../styles/Chat.module.scss";
import AddFriendModal from "../AddFriendModal";

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
        <span>Add contact</span>
      </button>
      {modalOpen && <AddFriendModal setModalOpen={setModalOpen} />}
    </div>
  );
}
