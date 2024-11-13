import React, { useState } from "react";
import QuestionTemplate from "../../components/QuestionTemplate";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Question = () => {
  return (
    <>
      {/* <Header /> */}
      <div>
        <QuestionTemplate />
      </div>
      <Footer />
    </>
  );
};

export default Question;
