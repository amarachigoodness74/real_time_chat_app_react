import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import InlineLoader from "../components/loaders/InlineLoader";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();

  const [error, setError] = useState<null | string>(null);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const handleSubmit = async (values: { email: string }) => {
    const { email } = values;

    setTimeout(() => {
      alert(JSON.stringify(email, null, 2));
    }, 400);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded px-8 py-6">
        <h2 className="text-cyan-700 text-2xl font-bold text-center mb-4">
          Forgot Password
        </h2>
        <header className="text-center">
          <i className="text-6xl text-cyan-800 fa fa-expeditedssl"></i>
        </header>
        <Formik
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
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

              <button
                type="submit"
                className="w-full bg-cyan-700 text-white py-2 px-4 rounded-md hover:bg-cyan-600 focus:outline-none focus:ring focus:ring-cyan-600 font-bold"
                disabled={isSubmitting}
              >
                {isSubmitting ? <InlineLoader /> : " Forgot Password"}
              </button>
              {error && (
                <div className="text-right py-3">
                  <p className="text-red-500 text-sm">{error}</p>
                </div>
              )}
              <div className="text-cyan-700 text-right pt-2">
                <Link to="/">Sign in</Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ForgotPassword;
