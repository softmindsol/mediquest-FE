import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NonProtectedRoute from "./components/NonProtectedRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/authentication/Login";
import SignUp from "./pages/authentication/SignUp";
import VerifyEmail from "./pages/authentication/VerifyEmail";
import EmailConfirmation from "./pages/email-confirmation/EmailConfirmation";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home/Home";
import Question from "./pages/questionstemplate/Questions";
import Settings from "./pages/settings/settings";
import Subscription from "./pages/subscription/Subscription";
import SummaryPage from "./pages/summary/Summary";
import Topic from "./pages/Topic/Topic";
import LandingPage from "./pages/landingpage/LandingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/home"
          element={
            <NonProtectedRoute>
              <LandingPage />
            </NonProtectedRoute>
          }
        />{" "}
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
          path="/question/:id"
          element={
            <ProtectedRoute>
              <Question />
            </ProtectedRoute>
          }
        />
        <Route path="/summary" element={<SummaryPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
