import React from 'react';
import { getQuestion, getQuestionAnswers, getResults} from '../services/QuizService';

const Question = ({ question, selectedAnswerId, onAnswerSelect, onNextQuestion }) => {
  const { text, answers } = question;

  const handleAnswerClick = (answerId) => {
    if (selectedAnswerId === null) {
      onAnswerSelect(answerId);
    }
  };

  return (
    <div className="question-container">
      <h2>{text}</h2>
      <div className="answers-container">
        {answers.map(answer => (
          <div
            key={answer.id}
            className={`answer ${selectedAnswerId === answer.id ? 'selected' : ''}`}
            onClick={() => handleAnswerClick(answer.id)}
          >
            {answer.answerText}
          </div>
        ))}
      </div>
      <button onClick={onNextQuestion} disabled={selectedAnswerId === null}>Next Question</button>
    </div>
  );
};

export default Question;
