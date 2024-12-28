import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { auth, storage, db } from "../utils/firebase";
import InlineLoader from "../components/loaders/InlineLoader";
import { SignupFormValues, UserStatus } from "../@types/@types.users";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState<null | string>(null);
  const [photoUploadState, setUploadState] = useState<null | string>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const initialValues: SignupFormValues = {
    username: "",
    email: "",
    password: "",
    profilePhoto: null,
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    profilePhoto: Yup.mixed()
      .nullable()
      .test("fileSize", "File too large", (value: any) => {
        return !value || (value && value.size <= 2 * 1024 * 1024); // 2MB limit
      })
      .test("fileType", "Unsupported file format", (value: any) => {
        return (
          !value ||
          (value &&
            ["image/jpeg", "image/png", "image/gif"].includes(value.type))
        );
      }),
  });

  const handleSubmit = async (values: SignupFormValues) => {
    setIsSubmitting(true);
    const { username, email, password, profilePhoto } = values;
    const displayName = username;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const date = new Date().getTime();
      const storageRef = ref(
        storage,
        `${displayName || profilePhoto?.name}-${date}`
      );
      if (profilePhoto) {
        const uploadTask = uploadBytesResumable(storageRef, profilePhoto);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (
              (snapshot.bytesTransferred / snapshot.totalBytes) *
              100
            ).toFixed(0);
            setUploadState("Upload is " + progress + "% done");
          },
          (error: any) => {
            setIsSubmitting(false);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                await updateProfile(user, {
                  displayName,
                  photoURL: downloadURL,
                });
                await setDoc(doc(db, "users", user.uid), {
                  uid: user.uid,
                  displayName,
                  email,
                  photoURL: downloadURL,
                  status: UserStatus?.online,
                });

                //create empty friends document on firestore
                await setDoc(doc(db, "friends", user.uid), {});
                navigate("/");
              }
            );
          }
        );
      }
    } catch (error: any) {
      setIsSubmitting(false);
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded px-8 py-6">
        <h2 className="text-cyan-700 text-2xl font-bold text-center mb-4">
          Sign Up
        </h2>
        <header className="text-center">
          <i className="text-6xl text-cyan-800 fa fa-expeditedssl"></i>
        </header>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700">
                  Username
                </label>
                <Field
                  name="username"
                  type="text"
                  className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-cyan-700"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-cyan-700"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-cyan-700"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="profilePhoto" className="block text-gray-700">
                  Profile Photo
                </label>
                <input
                  id="profilePhoto"
                  name="profilePhoto"
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    setFieldValue(
                      "profilePhoto",
                      event.currentTarget.files?.[0] || null
                    );
                  }}
                  className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-cyan-700"
                />
                <ErrorMessage
                  name="profilePhoto"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-cyan-700 text-white py-2 px-4 rounded-md hover:bg-cyan-600 focus:outline-none focus:ring focus:ring-cyan-600 font-bold"
                disabled={isSubmitting}
              >
                {isSubmitting ? <InlineLoader /> : " Sign Up"}
              </button>
              {error && (
                <div className="text-right py-3">
                  <p className="text-red-500 text-sm">{error}</p>
                </div>
              )}
              <div className="text-right pt-2">
                {photoUploadState && (
                  <p className="text-green-500 text-sm">{photoUploadState}</p>
                )}
                <p>
                  Already have an account?
                  <span className="text-cyan-700 font-bold hover:underline">
                    {" "}
                    <Link to="/">Sign in</Link>
                  </span>
                </p>{" "}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
