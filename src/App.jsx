import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/authentication/Login";
import SignUp from "./pages/authentication/SignUp";
import EmailConfirmation from "./pages/email-confirmation/EmailConfirmation";
import Home from "./pages/Home/Home";
import Question from "./pages/questionstemplate/Questions";
import Settings from "./pages/settings/settings";
import Subscription from "./pages/subscription/Subscription";
import Topic from "./pages/Topic/Topic";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/log-in" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/topic" element={<Topic />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/email-confirmation" element={<EmailConfirmation />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/question" element={<Question />} />
      </Routes>
    </Router>
  );
}

export default App;
