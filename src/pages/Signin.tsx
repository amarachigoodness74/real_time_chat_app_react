import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  browserLocalPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../utils/firebase";
import InlineLoader from "../components/loaders/InlineLoader";
import { SigninFormValues, UserStatus } from "../@types/@types.users";

const Signin: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState<null | string>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const initialValues: SigninFormValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: SigninFormValues) => {
    setIsSubmitting(true);
    const { email, password } = values;

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
        window.localStorage.setItem('auth', JSON.stringify(user));
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded px-8 py-6">
        <h2 className="text-cyan-700 text-2xl font-bold text-center mb-4">
          Sign In
        </h2>
        <header className="text-center">
          <i className="text-6xl text-cyan-800 fa fa-expeditedssl"></i>
        </header>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
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

            <button
              type="submit"
              className="w-full bg-cyan-700 text-white py-2 px-4 rounded-md hover:bg-cyan-600 focus:outline-none focus:ring focus:ring-cyan-600 font-bold"
              disabled={isSubmitting}
            >
              {isSubmitting ? <InlineLoader /> : " Sign In"}
            </button>
            {error && (
              <div className="text-right py-3">
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}
            <div className="text-right pt-2">
              <p>
                Don't have an account?
                <span className="text-cyan-700 font-bold hover:underline">
                  {" "}
                  <Link to="/signup">Sign up</Link>
                </span>
              </p>

              <p className="text-cyan-700 hover:underline">
                <Link to="/forgot-password">Forgot Password</Link>
              </p>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Signin;
