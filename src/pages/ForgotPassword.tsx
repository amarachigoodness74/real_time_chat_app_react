import React from "react";
import styles from "../styles/Auth.module.scss";
import { Link } from "react-router-dom";

function ForgotPassword() {
  return (
    <section>
      <div className={styles.Container}>
        <div className={styles.Background}></div>
        <h1 className={styles.Title}>Forgot Password</h1>
        <form>
          <header className={styles.FormHeader}>
            <i className="fa fa-expeditedssl"></i>
          </header>

          <div className={styles.Inputs}>
            <label htmlFor="name">
              <input type="text" name="name" placeholder="username or email" />
            </label>

            <p className={styles.Light}>
              Don't have an account? <Link to="/signup">Signup</Link>
            </p>
          </div>
        </form>

        <footer className={styles.Footer}>
          <button>Continue</button>
          <p>
            Already have an account? <Link to="/">Sign in</Link>
          </p>
        </footer>
      </div>
    </section>
  );
}

export default ForgotPassword;
