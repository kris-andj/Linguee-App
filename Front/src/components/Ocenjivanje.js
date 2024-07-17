import React, { useState, useEffect } from 'react';
import './Ocenjivanje.css';
import axios from 'axios';  
import { getToken } from '../services/AuthService'; 

const Ocenjivanje = () => {
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [wordScrambleScore, setWordScrambleScore] = useState(null);
  const [quizMilionerScore, setQuizMilionerScore] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
    const token = getToken();
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      
      const userIdResponse = await axios.get(`https://localhost:5000/Projekat/GetUserId/${username}`);
      const userIdData = userIdResponse.data;

      
      const wordScrambleResponse = await axios.get(`https://localhost:5000/WordScramble/GetScore/${userIdData}`);
      const wordScrambleData = wordScrambleResponse.data;
      setWordScrambleScore(wordScrambleData);

      
      const quizMilionerResponse = await axios.get(`https://localhost:5000/QuizMilioner/GetResult/${userIdData}`);
      const quizMilionerData = quizMilionerResponse.data;
      setQuizMilionerScore(quizMilionerData);

    } catch (error) {
      console.error('Greška prilikom dohvatanja rezultata kviza:', error);
      alert('Ovaj učenik/ca nije završila oba kviza.');
    } finally {
      setLoading(false);
    }
  };

  const handleRatingSubmit = async () => {
    const ratingData = {
      KorisnickoImeUcenika: username,
      OpisnaOcena: description
    };

    try {
      const response = await axios.post('https://localhost:5000/Projekat/Ocenjivanje', ratingData);

      if (response.status === 200) {
        alert('Ocena uspešno poslata!');
        setUsername('');
        setDescription('');
        setWordScrambleScore(null);
        setQuizMilionerScore(null);
      } else {
        alert('Došlo je do greške prilikom slanja ocene.');
      }
    } catch (error) {
      console.error('Greška prilikom slanja ocene:', error);
      alert('Došlo je do greške prilikom slanja ocene.');
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Korisničko ime učenika:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit" disabled={loading}>Pronađi rezultat kviza</button>
      </form>

      {(wordScrambleScore !== null || quizMilionerScore !== null) && (
        <div className="quiz-scores">
          {wordScrambleScore !== null && (
            <p>Ovaj učenik je ostvario sledeći uspeh na Word Scramble kvizu: {wordScrambleScore}</p>
          )}

          {quizMilionerScore !== null && (
            <p>Ovaj učenik je ostvario sledeći uspeh na Quiz Milioner kvizu: {quizMilionerScore}</p>
          )}

          <form onSubmit={handleRatingSubmit}>
            <div>
              <label>
                Opisna ocena:
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </label>
            </div>
            <button type="submit" disabled={loading}>Dodaj ocenu</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Ocenjivanje;
