import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  getRemainingTime,
  getSummary,
} from "../../store/features/quiz/quiz.service";
import { useNavigate } from "react-router-dom";

const Timer = ({ id }) => {
  const dispatch = useDispatch();
  const timerRef = useRef(null);
  const navigate = useNavigate();

  const [timer, setTimer] = useState("00:00:00");
  const [isRunning, setIsRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await dispatch(getRemainingTime({ id }));

      if (res.type === "getRemainingTime/fulfilled") {
        const remainingTimeInSeconds = res.payload.remainingTime;

        setTimeRemaining(remainingTimeInSeconds);
        startTimer(remainingTimeInSeconds);
      }
    };

    fetchData();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [dispatch, id]);

  const getTimeRemaining = (total) => {
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return { total, hours, minutes, seconds };
  };

  const startTimer = (total) => {
    if (timerRef.current) clearInterval(timerRef.current);

    let remaining = total;
    setTimer(getFormattedTime(remaining));

    const timerId = setInterval(() => {
      remaining -= 1000;
      setTimer(getFormattedTime(remaining));

      if (remaining <= 0) {
        clearInterval(timerId);
        setIsRunning(false);
        dispatch(getSummary({ id }));
        navigate(`/summary/${id}`);
      }
    }, 1000);

    timerRef.current = timerId;
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
