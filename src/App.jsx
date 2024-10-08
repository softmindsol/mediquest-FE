import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // Import useSelector
import Login from "./pages/authentication/Login";
import SignUp from "./pages/authentication/SignUp";
import EmailConfirmation from "./pages/email-confirmation/EmailConfirmation";
import Home from "./pages/Home/Home";
import Question from "./pages/questionstemplate/Questions";
import Settings from "./pages/settings/settings";
import Subscription from "./pages/subscription/Subscription";
import Topic from "./pages/Topic/Topic";
import ProtectedRoute from "./components/ProtectedRoute";
import { verifyToken } from "./store/features/auth/auth.service";
import VerifyEmail from "./pages/authentication/VerifyEmail";

function App() {
  // Access the isLoggedIn state from Redux
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state?.user); // Ensure proper path to user state

  useEffect(() => {
    // Dispatch verify token API only if user is not logged in
    if (!isLoggedIn) {
      dispatch(verifyToken());
    }
  }, [dispatch, isLoggedIn]);

  return (
    <Router>
      <Routes>
        <Route
          path="/log-in"
          element={isLoggedIn ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/sign-up"
          element={isLoggedIn ? <Navigate to="/" replace /> : <SignUp />}
        />
        <Route
          path="/email-confirmation"
          element={
            isLoggedIn ? <Navigate to="/" replace /> : <EmailConfirmation />
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/topic"
          element={
            <ProtectedRoute>
              <Topic />
            </ProtectedRoute>
          }
        />
        <Route
          path="/verify-email/:verificationToken"
          element={<VerifyEmail />}
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/subscription"
          element={
            <ProtectedRoute>
              <Subscription />
            </ProtectedRoute>
          }
        />
        <Route
          path="/question"
          element={
            <ProtectedRoute>
              <Question />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
