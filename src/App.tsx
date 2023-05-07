import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import PageLoader from "./components/loaders/PageLoader";
import reloadOnFail from "./utils/reloadOnFail";

import "./styles/main.scss";

const SignupPage = lazy(() => reloadOnFail(() => import("./pages/Signup")));
const SigninPage = lazy(() => reloadOnFail(() => import("./pages/Signin")));
const ForgotPasswordPage = lazy(() =>
  reloadOnFail(() => import("./pages/ForgotPassword"))
);
const ResetPasswordPage = lazy(() =>
  reloadOnFail(() => import("./pages/ResetPassword"))
);
const ChatPage = lazy(() => reloadOnFail(() => import("./pages/Chat")));

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
