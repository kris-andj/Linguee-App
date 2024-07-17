import React from 'react';
import { saveResult } from '../services/QuizService'; 

const Result = ({ score }) => {

  const handleSaveResult = async () => {
    try {
      const resultData = { score }; 
      await saveResult(resultData); 
      console.log('Result saved successfully!');
      
    } catch (error) {
      console.error('Error saving result:', error);
      
    }
  };

  return (
    <div className="result-container">
      <h2>Game Over!</h2>
      <p>Your score: {score}</p>
      <button onClick={handleSaveResult}>Save Result</button>
    </div>
  );
};

export default Result;
