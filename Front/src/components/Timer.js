import { useEffect, useState } from "react";

const Timer = ({ setTimeOut, questionNumber }) => {
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 0) {
          setTimeOut(true);
          clearInterval(interval);
          return prev;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [setTimeOut]);

  useEffect(() => {
    setTimer(30);
  }, [questionNumber]);

  return (
    <div className="timer">
      <p>Time left: {timer} seconds</p>
    </div>
  );
};

export default Timer;

