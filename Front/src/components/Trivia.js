import React from 'react';
import useSound from "use-sound";
import play from "./sounds/play.mp3";
import correctSound from "./sounds/correct.mp3";
import wrongSound from "./sounds/wrong.mp3";
import { useEffect } from "react";

const Trivia = ({ question, answers, selectedAnswer, setSelectedAnswer, handleAnswerClick }) => {
  console.log('question:', question);
  console.log('answers:', answers);

  const [letsPlay] = useSound(play);
  const [playCorrect] = useSound(correctSound);
  const [playWrong] = useSound(wrongSound);

  useEffect(() => {
    letsPlay();
  }, [letsPlay]);

  const answerValues = answers && answers.$values ? answers.$values : [];

  const handleClick = async (answerId) => {
    setSelectedAnswer(answerId);
    try {
      const isCorrect = await handleAnswerClick(answerId);
      if (!isCorrect) {
        playCorrect();
      } else {
        playWrong();
      }
    } catch (error) {
      console.error("Error handling answer:", error);
    }
  };

  return (
    <div className="trivia">
      <h2>{question}</h2>
      <div className="answers">
        {answerValues.map((answer, index) => (
          <div
            key={answer.id}
            className={`answer ${selectedAnswer === answer.id ? 'selected' : ''}`}
            onClick={() => handleClick(answer.id)}
          >
            <span className="letter">{String.fromCharCode(65 + index)}</span>
            <span className="text">{answer.answerText}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trivia;

