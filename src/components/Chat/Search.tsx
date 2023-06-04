import React, { KeyboardEvent } from "react";
import styles from "../../styles/Chat.module.scss";

type SearchProps = {
  handleSearch: (e: KeyboardEvent<HTMLInputElement>) => void;
};

export default function Search({ handleSearch }: SearchProps) {
  return (
    <div className={styles.Search}>
      <label htmlFor="search">
        <i className="fa fa-search" aria-hidden="true"></i>
      </label>
      <input
        id="search"
        type="text"
        placeholder="Search contacts..."
        onKeyUp={handleSearch}
      />
      <span className={styles.RefreshBtn}>
        <i className="fa fa-refresh"></i>
      </span>
    </div>
  );
}
