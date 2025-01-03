import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { confirmPasswordReset } from "firebase/auth";
import { auth } from "../utils/firebase";
import InlineLoader from "../components/loaders/InlineLoader";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<null | string>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<null | string>(null);

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values: { password: string }) => {
    const oobCode = new URLSearchParams(window.location.search).get("oobCode");
    const { password } = values;
    if (oobCode) {
      confirmPasswordReset(auth, oobCode, password)
        .then(() => {
          setStatus(
            "Your password has been reset. You will be redirected to log in in 3 seconds"
          );
          setTimeout(() => {
            navigate("/");
          }, 3000);
        })
        .catch((_) => {
          setError("Error sending password reset email, try again!");
        });
    } else {
      setError("Invalid link!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded px-8 py-6">
        <h2 className="text-cyan-700 text-2xl font-bold text-center mb-4">
          Reset Password
        </h2>
        <header className="text-center">
          <i className="text-6xl text-cyan-800 fa fa-expeditedssl"></i>
        </header>
        <Formik
          initialValues={{ password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
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
                {isSubmitting ? <InlineLoader /> : " Reset Password"}
              </button>
              {error && (
                <div className="text-right py-3">
                  <p className="text-red-500 text-sm">{error}</p>
                </div>
              )}
              {status && <p className="text-green-500 text-sm">{status}</p>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ForgotPassword;
