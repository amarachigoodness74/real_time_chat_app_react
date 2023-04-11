import React from "react";

function Profile() {
  return (
    <div id="profile">
      <div className="wrap">
        <img
          id="profile-img"
          src="http://emilcarlsson.se/assets/mikeross.png"
          className="online"
          alt=""
        />
        <p>Mike Ross</p>
        <div id="status-options">
          <ul>
            <li id="status-online" className="active">
              <span className="status-circle"></span> <p>Online</p>
            </li>
            <li id="status-away">
              <span className="status-circle"></span> <p>Away</p>
            </li>
            <li id="status-busy">
              <span className="status-circle"></span> <p>Busy</p>
            </li>
            <li id="status-offline">
              <span className="status-circle"></span> <p>Offline</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Profile;
