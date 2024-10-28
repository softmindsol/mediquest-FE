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
import NonProtectedRoute from "./components/NonProtectedRoute";
import SummaryPage from "./pages/summary/Summary";
import ErrorPage from "./pages/ErrorPage";
import LandingPage from "./pages/landingpage/LandingPage";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state?.user?.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(verifyToken());
    }
  }, [dispatch, isLoggedIn]);

  return (
    <Router>
      <Routes>
        <Route
          path="/log-in"
          element={
            <NonProtectedRoute>
              <Login />
            </NonProtectedRoute>
          }
        />
        <Route
          path="/sign-up"
          element={
            <NonProtectedRoute>
              <SignUp />
            </NonProtectedRoute>
          }
        />
        <Route
          path="/email-confirmation"
          element={
            <NonProtectedRoute>
              <EmailConfirmation />
            </NonProtectedRoute>
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
          path="/question-bank"
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
        <Route path="/summary" element={<SummaryPage />} />
        <Route path="/landingpage" element={<LandingPage />} />


        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
