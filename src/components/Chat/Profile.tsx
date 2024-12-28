import React from "react";
import { signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../utils/firebase";
import useCurrentUser from "../../hooks/useCurrentUser";
import styles from "../../styles/Chat.module.scss";

function Profile() {
  const { currentUser } = useCurrentUser();

  const handleStatusDropdown = () => {
    let statusOptions: HTMLElement | null =
      document.getElementById("status-options");
    statusOptions && statusOptions.classList.toggle("Active");
  };

  const handleStatusChange = async (status: string) => {
    let profileImg: HTMLElement | null = document.getElementById("profile-img");
    if (profileImg) profileImg.className = status;
    if (currentUser) {
      await updateDoc(doc(db, "users", currentUser.uid), {
        status: status,
      });
    }
    handleStatusDropdown();
  };

  const handleSignOut = async () => {
    if (currentUser) {
      await updateDoc(doc(db, "users", currentUser.uid), {
        status: "Offline",
      });
    }
    await signOut(auth);
  };

  return (
    <div className={styles.Profile}>
      {currentUser ? (
        <>
          <div className={styles.Wrap}>
            <span
              onClick={handleStatusDropdown}
              className={styles.StatusWrapper}
            >
              <img
                id="profile-img"
                src={currentUser?.photoURL || ""}
                className="Online"
                alt={currentUser?.displayName || ""}
              />
              <i className="fa fa-caret-down"></i>
            </span>
            <p>{currentUser?.displayName}</p>
            <div id="status-options" className={styles.StatusOptions}>
              <ul>
                <li
                  className={styles.StatusOnline}
                  onClick={() => handleStatusChange("Online")}
                >
                  <span className={styles.StatusCircle}></span> <p>Online</p>
                </li>
                <li
                  className={styles.StatusAway}
                  onClick={() => handleStatusChange("Away")}
                >
                  <span className={styles.StatusCircle}></span> <p>Away</p>
                </li>
                <li
                  className={styles.StatusBusy}
                  onClick={() => handleStatusChange("Busy")}
                >
                  <span className={styles.StatusCircle}></span> <p>Busy</p>
                </li>
                <li
                  className={styles.StatusOffline}
                  onClick={() => handleStatusChange("Offline")}
                >
                  <span className={styles.StatusCircle}></span> <p>Offline</p>
                </li>
              </ul>
            </div>
          </div>
          <span
            className={styles.StatusBtn}
            onClick={handleSignOut}
            title="Logout"
          >
            <i className="fa fa-sign-out"></i>
          </span>
        </>
      ) : null}
    </div>
  );
}

export default Profile;
