import React from "react";
import styles from "../styles/Auth.module.scss";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextInput } from "../components/FormElements";

const validation = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
});

function ForgotPassword() {
  return (
    <section>
      <div className={styles.Container}>
        <div className={styles.Background}></div>
        <h1 className={styles.Title}>Forgot Password</h1>
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={validation}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
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
                  <p className={styles.Light}>
                    Don't have an account? <Link to="/signup">Signup</Link>
                  </p>
                </div>
              </div>

              <footer className={styles.Footer}>
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

export default ForgotPassword;
