import React from "react";
import styles from "../../styles/Chat.module.scss";

function Search() {
  return (
    <div className={styles.Search}>
      <label htmlFor="">
        <i className="fa fa-search" aria-hidden="true"></i>
      </label>
      <input type="text" placeholder="Search contacts..." />
    </div>
  );
}

export default Search;
