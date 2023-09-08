import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { auth, storage, db } from "../utils/firebase";
import { PasswordInput, TextInput } from "../components/FormElements";
import InlineLoader from "../components/loaders/InlineLoader";
import { IAuthData, UserStatus } from "../@types/@types.users";
import styles from "../styles/Auth.module.scss";

const validation = Yup.object({
  displayName: Yup.string()
    .min(3, "Must be 3 characters or more")
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  photoURL: Yup.mixed().required(),
  password: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
});

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState<null | string>(null);
  const [photoUrl, setPhotoUrl] = useState<null | string>(null);
  const [photoUploadState, setUploadState] = useState<null | string>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSignup = async ({
    displayName,
    email,
    password,
    photoURL,
  }: IAuthData) => {
    setIsSubmitting(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName || photoURL.name}-${date}`);
      const uploadTask = uploadBytesResumable(storageRef, photoURL);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
          setUploadState("Upload is " + progress + "% done");
        },
        (error: any) => {
          console.error("error", error);
          setIsSubmitting(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", user.uid), {
              uid: user.uid,
              displayName,
              email,
              photoURL: downloadURL,
              status: UserStatus.online,
            });

            //create empty friends document on firestore
            await setDoc(doc(db, "friends", user.uid), {});
            navigate("/chat");
          });
        }
      );
    } catch (error: any) {
      setIsSubmitting(false);
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
            displayName: "",
            email: "",
            password: "",
            photoURL: "",
          }}
          validationSchema={validation}
          onSubmit={(values, { setSubmitting }) => {
            if (!error) {
              handleSignup(values);
            }
            setSubmitting(false);
          }}
        >
          {({ setFieldValue }) => (
            <Form>
              <div className={styles.Form}>
                <header className={styles.FormHeader}>
                  <i className="fa fa-expeditedssl"></i>
                </header>

                <div className={styles.Inputs}>
                  <TextInput name="displayName" placeholder="username" />
                  <TextInput name="email" placeholder="email" />
                  <PasswordInput name="password" placeholder="password" />
                  <label className={styles.PhotoLabel} htmlFor="photoURL">
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
                      id="photoURL"
                      name="photoURL"
                      accept="image/*"
                      type="file"
                      hidden
                      onChange={(e: any) => {
                        if (e.target.files && e.target.files[0]) {
                          setPhotoUrl(URL.createObjectURL(e.target.files[0]));
                          setFieldValue("photoURL", e.currentTarget.files[0]);
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
                {photoUploadState && (
                  <p className={styles.Status}>{photoUploadState}</p>
                )}

                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <InlineLoader /> : "Continue"}
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
