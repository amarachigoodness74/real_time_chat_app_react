import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getDownloadURL, uploadBytesResumable, ref } from "firebase/storage";
import { auth, storage, db } from "../utils/firebase";
import { PasswordInput, TextInput } from "../components/FormElements";
import { IUserData } from "../@types/@types.users";
import styles from "../styles/Auth.module.scss";
import { doc, setDoc } from "firebase/firestore";

const validation = Yup.object({
  username: Yup.string()
    .min(3, "Must be 3 characters or more")
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  displayImg: Yup.mixed().required(),
  password: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
});

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState<null | string>(null);
  const [photoUrl, setPhotoUrl] = useState<null | string>(null);
  const handleSignup = async ({
    username,
    email,
    password,
    displayImg,
  }: IUserData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const profilePicsRef = ref(storage, username);
      const profilePics = uploadBytesResumable(profilePicsRef, displayImg);
      profilePics.on(
        "state_changed",
        (error: any) => {
          throw error(error.message);
        },
        () => {
          getDownloadURL(profilePics.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(user, {
              displayName: username,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", user.uid), {
              uid: user.uid,
              displayName: username,
              email,
              photoURL: downloadURL,
            });
            navigate("/chat");
          });
        }
      );
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
          initialValues={{
            username: "",
            email: "",
            password: "",
            displayImg: "",
          }}
          validationSchema={validation}
          onSubmit={(values, { setSubmitting }) => {
            if (!error) {
              handleSignup(values);
            }
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <div className={styles.Form}>
                <header className={styles.FormHeader}>
                  <i className="fa fa-expeditedssl"></i>
                </header>

                <div className={styles.Inputs}>
                  <TextInput name="username" placeholder="username" />
                  <TextInput name="email" placeholder="email" />
                  <PasswordInput name="password" placeholder="password" />
                  <label className={styles.PhotoLabel} htmlFor="displayImg">
                    {photoUrl ? (
                      <>
                        <img
                          src={photoUrl}
                          alt="Profile Avatar"
                          style={{
                            borderRadius: "50%",
                            width: "50px",
                            height: "50px",
                          }}
                        />
                        <span>Change avatar</span>
                      </>
                    ) : (
                      <>
                        <i className="fa fa-cloud-upload"></i>
                        <span>Add an avatar</span>
                      </>
                    )}
                    <input
                      id="displayImg"
                      name="displayImg"
                      accept="image/*"
                      type="file"
                      hidden
                      onChange={(e: any) => {
                        if (e.target.files && e.target.files[0]) {
                          setPhotoUrl(URL.createObjectURL(e.target.files[0]));
                          setFieldValue("displayImg", e.currentTarget.files[0]);
                        } else {
                          setError("Please upload a valid image");
                        }
                      }}
                    />
                  </label>
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
