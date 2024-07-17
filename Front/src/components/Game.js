import "./Game.css";
import { useEffect, useState } from "react";
import Start from "./Start.js";
import Timer from "./Timer.js";
import Trivia from "./Trivia.js";
import axios from 'axios';
import { getCurrentUser } from '../services/AuthService';

function Game() {
  const [username, setUsername] = useState(null);
  const [timeOut, setTimeOut] = useState(false);
  const [earned, setEarned] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const [poeni, setPoeni] = useState(0);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error('Greška pri dobavljanju trenutnog korisnika:', error);
      }
    };

    fetchCurrentUser();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get("https://localhost:5000/QuizMilioner/GetQuestions");
      console.log(response);
      setQuestions(response.data.$values);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleAnswerClick = async (answerId) => {
    try {
      console.log(`Selected answer ID: ${answerId}`);
      const response = await axios.get(`https://localhost:5000/QuizMilioner/GetQuestionAnswers/${questions[selectedQuestionIndex].id}?selectedAnswerId=${answerId}`);
      const isCorrect = response.data.isCorrect;

      console.log('Answer clicked:', answerId);
      console.log('Is correct:', isCorrect);

      if (isCorrect) {
        setEarned((current) => current + 100);
        setPoeni((current) => current + 100);
        if (selectedQuestionIndex + 1 < questions.length) {
          setTimeout(() => {
            setSelectedQuestionIndex((prevIndex) => prevIndex + 1);
            setSelectedAnswer(null);
          }, 1000); 
        } else {
          saveScore();
          setTimeOut(true);
        }
      } else {
        saveScore();
        setTimeOut(true);
      }
    } catch (error) {
      console.error("Error checking answer:", error);
    }
  };

  const saveScore = async () => {
    try {
      const response = await axios.post("https://localhost:5000/QuizMilioner/SaveResult", {
        ucenikId: currentUser?.id,
        score: poeni
      });
      console.log('Rezultat je sačuvan na backendu.', response.data);
    } catch (error) {
      console.error('Greška prilikom čuvanja rezultata:', error);
    }
  };

  const startGame = () => {
    setUsername("Player");
    fetchQuestions();
  };

  const renderTrivia = () => {
    if (questions.length === 0 || questions[selectedQuestionIndex] === undefined) {
      return null;
    }

    const currentQuestion = questions[selectedQuestionIndex];

    return (
      <Trivia
        question={currentQuestion.text}
        answers={currentQuestion.answers}
        selectedAnswer={selectedAnswer}
        setSelectedAnswer={setSelectedAnswer}
        handleAnswerClick={handleAnswerClick}
      />
    );
  };

  return (
    <div className="game">
      {!username ? (
        <Start setUsername={setUsername} startGame={startGame} />
      ) : (
        <div className="main">
          {timeOut ? (
            <h1 className="endText">Osvojili ste: {earned}</h1>
          ) : (
            <>
              <div className="top">
                <div className="timer">
                  <Timer setTimeOut={setTimeOut} questionNumber={selectedQuestionIndex + 1} />
                </div>
              </div>
              <div className="bottom">
                {renderTrivia()}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Game;
