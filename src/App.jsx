import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/authentication/Login";
import SignUpStep1 from "./pages/authentication/SignUpStep1";
import SignUpStep2 from "./pages/authentication/SignUpStep2";
import Home from "./pages/Home/Home";
import EmailConfirmation from "./pages/email-confirmation./EmailConfirmation";
import Subscription from "./pages/subscription/Subscription";
import Topic from "./pages/Topic/Topic";
import Settings from "./pages/settings/settings";
import Question from "./pages/questionstemplate/Questions";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/log-in" element={<Login />} />
        <Route path="/sign-up" element={<SignUpStep1 />} />
        <Route path="/sign-up2" element={<SignUpStep2 />} />
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
