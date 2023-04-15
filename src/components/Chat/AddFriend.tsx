import React from "react";
import styles from "../../styles/Chat.module.scss";

export default function AddFriend() {
  return (
    <div className={styles.BottomBar}>
      <button id="addcontact">
        <i className="fa fa-user-plus fa-fw" aria-hidden="true"></i>{" "}
        <span>Add contact</span>
      </button>
    </div>
  );
}
