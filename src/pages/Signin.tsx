import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import styles from "../styles/Auth.module.scss";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { PasswordInput, TextInput } from "../components/FormElements";
import { IUserData } from "../types/users";

const validation = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
});

function Signin() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSignin = async ({ email, password }: IUserData) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      if(user) {
        navigate("/chat");
      }
    } catch (error: any) {
      setError(error.message);
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
          onSubmit={(values, { setSubmitting }) => {
            handleSignin(values);
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
                  <TextInput name="email" placeholder="email" />
                  <PasswordInput name="password" placeholder="password" />
                  <p className={styles.Light}>
                    <Link to="/forgot-password">Forgot password?</Link>
                  </p>
                </div>
              </div>

              <footer className={styles.Footer}>
                <button type="submit" disabled={isSubmitting}>
                  Continue
                </button>
                <p>
                  Don't have an account? <Link to="/signup">Sign up</Link>
                </p>

                {error && <p>error</p>}
              </footer>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}

export default Signin;
