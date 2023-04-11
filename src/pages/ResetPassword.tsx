import React, { useState } from "react";
import styles from "../styles/Auth.module.scss";
import { Link } from "react-router-dom";

function ResetPassword() {
  const [passwordVissible, setPasswordVissible] = useState(false);
  const [cpasswordVissible, setCPasswordVissible] = useState(false);
  return (
    <section>
      <div className={styles.Container}>
        <div className={styles.Background}></div>
        <h1 className={styles.Title}>Reset Password</h1>
        <form>
          <header className={styles.FormHeader}>
            <i className="fa fa-expeditedssl"></i>
          </header>

          <div className={styles.Inputs}>
            <label htmlFor="password">
              <input
                type={passwordVissible ? "text" : "password"}
                name="password"
                placeholder="password"
              />
              <i
                className={passwordVissible ? "fa fa-eye" : "fa fa-eye-slash"}
                onClick={() => setPasswordVissible(!passwordVissible)}
              ></i>
            </label>
            <label htmlFor="confirm-password">
              <input
                type={cpasswordVissible ? "text" : "password"}
                name="confirm-password"
                placeholder="Confirm password"
              />
              <i
                className={cpasswordVissible ? "fa fa-eye" : "fa fa-eye-slash"}
                onClick={() => setCPasswordVissible(!cpasswordVissible)}
              ></i>
            </label>
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

export default ResetPassword;
