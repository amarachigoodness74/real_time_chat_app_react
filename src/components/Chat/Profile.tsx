import React from "react";
import styles from "../../styles/Chat.module.scss";

function Profile() {
  const handleStatusDropdown = () => {
    let statusOptions: HTMLElement | null =
      document.getElementById("status-options");
    statusOptions && statusOptions.classList.toggle("Active");
  };

  const handleStatusChange = (status: string) => {
    let profileImg: HTMLElement | null = document.getElementById("profile-img");
    if (profileImg) profileImg.className = status;
    handleStatusDropdown();
  };

  return (
    <div className={styles.Profile}>
      <div className={styles.Wrap}>
        <img
          id="profile-img"
          src="http://emilcarlsson.se/assets/mikeross.png"
          className={styles.Online}
          alt=""
          onClick={handleStatusDropdown}
        />
        <p>Mike Ross</p>
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
    </div>
  );
}

export default Profile;
