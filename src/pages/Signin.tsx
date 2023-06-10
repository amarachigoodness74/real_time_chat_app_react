import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../utils/firebase";
import { PasswordInput, TextInput } from "../components/FormElements";
import InlineLoader from "../components/loaders/InlineLoader";
import { IUserData, UserStatus } from "../@types/@types.users";
import styles from "../styles/Auth.module.scss";


const validation = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
});

function Signin() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSignin = async ({ email, password }: IUserData) => {
    setIsSubmitting(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      if (user) {
        await updateDoc(doc(db, "users", user.uid), {
          status: UserStatus.online,
        });
        navigate("/chat");
      } else {
        setIsSubmitting(false);
        setError("Something went wrong, try again!");
      }
    } catch (error: any) {
      setIsSubmitting(false);
      const errorMessage = error.message || error[0].message;
      if (errorMessage.includes("user-not-found")) {
        setError("User not found, please create an account");
      } else {
        setError(error.message || error[0].message);
      }
    }
  };

  return (
    <section>
      <div className={styles.Container}>
        <div className={styles.Background}></div>
        <h1 className={styles.Title}>Signin</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validation}
          onSubmit={(values) => {
            handleSignin(values);
          }}
        >
          <Form>
            <div className={styles.Form}>
              <header className={styles.FormHeader}>
                <i className="fa fa-expeditedssl"></i>
              </header>

              <div className={styles.Inputs}>
                <TextInput name="email" placeholder="email" />
                <PasswordInput name="password" placeholder="password" />
                <p className={styles.Light}>
                  <Link to="/forgot-password">Forgot password?</Link>
                </p>
              </div>
            </div>

            <footer className={styles.Footer}>
              {error && <p className={styles.Error}>{error}</p>}
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <InlineLoader /> : "Continue"}
              </button>
              <p>
                Don't have an account? <Link to="/signup">Sign up</Link>
              </p>
            </footer>
          </Form>
        </Formik>
      </div>
    </section>
  );
}

export default Signin;
