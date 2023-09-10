import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PageLoader from "./components/loaders/PageLoader";
import reloadOnFail from "./utils/reloadOnFail";
import useCurrentUser from "./hooks/useCurrentUser";
import { AuxProps } from "./@types/@types.children";
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
  const currentUser = useCurrentUser();
//   firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//       console.log('user is logged');
//     }
// });
  const ProtectedRoute = ({ children }: AuxProps) => {
    if (!currentUser) {
      return <Navigate to="/" />;
    }
    return <>{children}</>;
  };

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* Todo */}
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        {/* End of Todo */}
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );
}

export default App;
