import React from "react";
import styles from "../styles/Auth.module.scss";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { PasswordInput, TextInput } from "../components/FormElements";

const validation = Yup.object({
  name: Yup.string()
    .min(3, "Must be 3 characters or more")
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
});

function Signup() {
  return (
    <section>
      <div className={styles.Container}>
        <div className={styles.Background}></div>
        <h1 className={styles.Title}>Signup</h1>
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
              <header className={styles.FormHeader}>
                <i className="fa fa-expeditedssl"></i>
              </header>

              <div className={styles.Inputs}>
                <TextInput name="name" placeholder="username" />
                <TextInput name="email" placeholder="email" />
                <PasswordInput name="password" placeholder="password" />
              </div>
            </Form>
          )}
        </Formik>

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

export default Signup;
