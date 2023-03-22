import React from "react";
import styles from '../styles/Auth.module.scss';

function Signin() {
  return (
    <section>
      <div className={styles.Container}>
        <div className={styles.Background}></div>
        <h1 className={styles.Title}>Signin</h1>
        <form>
          <header>
            <img src="https://assets.codepen.io/3931482/internal/avatars/users/default.png?format=auto&height=80&version=1592223909&width=80" alt="" />
          </header>

          <div className={styles.Inputs}>
            <input type="text" name="" placeholder="username or email" />
            <input type="password" name="" placeholder="password" />

            <p className={styles.Light}>
              <a href="">Forgot password?</a>
            </p>
          </div>
        </form>

        <footer>
          <button>Continue</button>
          <p>
            Don't have an account? <a href="">Sign Up</a>
          </p>
        </footer>
      </div>
    </section>
  );
}

export default Signin;
