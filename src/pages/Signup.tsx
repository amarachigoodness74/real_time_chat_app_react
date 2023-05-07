import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import { auth, db } from "../utils/firebase";
import styles from "../styles/Auth.module.scss";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { PasswordInput, TextInput } from "../components/FormElements";
import { IUserData } from "../@types/@types.users.ts";

const validation = Yup.object({
  username: Yup.string()
    .min(3, "Must be 3 characters or more")
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
});

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const handleSignup = async ({ username, email, password }: IUserData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, { displayName: username });
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        username,
        email,
        photoURL: ""
      })
      navigate("/chat");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <section>
      <div className={styles.Container}>
        <div className={styles.Background}></div>
        <h1 className={styles.Title}>Signup</h1>
        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          validationSchema={validation}
          onSubmit={(values, { setSubmitting }) => {
            handleSignup(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className={styles.Form}>
                <header className={styles.FormHeader}>
                  <i className="fa fa-expeditedssl"></i>
                </header>

                <div className={styles.Inputs}>
                  <TextInput name="username" placeholder="username" />
                  <TextInput name="email" placeholder="email" />
                  <PasswordInput name="password" placeholder="password" />
                </div>
              </div>

              <footer className={styles.Footer}>
                {error && <p className={styles.Error}>{error}</p>}
                <button type="submit" disabled={isSubmitting}>
                  Continue
                </button>
                <p>
                  Already have an account? <Link to="/">Sign in</Link>
                </p>
              </footer>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}

export default Signup;
