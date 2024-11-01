// Timer.js
import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { getSummary } from "../../store/features/quiz/quiz.service";

const Timer = ({ startTime, id }) => {
  const dispatch = useDispatch();

  const Ref = useRef(null);
  const [timer, setTimer] = useState("00:00:00");
  const [isRunning, setIsRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);

  console.log(startTime);

  useEffect(() => {
    if (!startTime) {
      console.error("startTime is undefined");
      return; // Exit if startTime is not provided
    }

    const [hours, minutes, seconds] = startTime.split(":").map(Number);
    const total = (hours * 3600 + minutes * 60 + seconds) * 1000; // Convert to milliseconds
    setTimeRemaining(total);
    startTimer(total);
  }, [startTime]);

  const getTimeRemaining = (total) => {
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return { total, hours, minutes, seconds };
  };

  const startTimer = (total) => {
    if (Ref.current) clearInterval(Ref.current);

    let remaining = total;
    setTimer(getFormattedTime(remaining));

    const timerId = setInterval(() => {
      remaining -= 1000; // Decrease by 1 second
      setTimer(getFormattedTime(remaining));

      if (remaining <= 0) {
        clearInterval(timerId); // Stop the timer
        setIsRunning(false); // Update running state
        dispatch(getSummary({ id }));
      }
    }, 1000);

    Ref.current = id;
    setIsRunning(true);
  };

  const getFormattedTime = (total) => {
    const { hours, minutes, seconds } = getTimeRemaining(total);
    return (
      (hours > 9 ? hours : "0" + hours) +
      ":" +
      (minutes > 9 ? minutes : "0" + minutes) +
      ":" +
      (seconds > 9 ? seconds : "0" + seconds)
    );
  };

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <h2>{timer}</h2>
    </div>
  );
};

export default Timer;
