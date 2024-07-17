import React, { useState, useEffect } from 'react';
import "./Wordscramble.css"
import axios from 'axios';
import { getCurrentUser } from '../services/AuthService';

const WordScramble = () => {
  const [scrambledWords, setScrambledWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [unos, setUnos] = useState('');
  const [tacnaRec, setTacnaRec] = useState('');
  const [poruka, setPoruka] = useState('');
  const [poeni, setPoeni] = useState(0);
  const [igraPocela, setIgraPocela] = useState(false);
  const [krajIgre, setKrajIgre] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchScrambledWords = async () => {
      try {
        const response = await axios.get("https://localhost:5000/WordScramble/GetAllScrumbledWords");
        console.log(response);
        console.log(response.data);
        
        if (response.data && response.data.$values && Array.isArray(response.data.$values)) {
          const scrambledWordsData = response.data.$values.map(word => ({
            id: word.id,
            correctWord: word.correctWord.toUpperCase(),
            scrambledWord: word.scrambledWord.toUpperCase()
          }));
          
          setScrambledWords(scrambledWordsData);
        } else {
          console.error("Greška: Prazan ili nevalidan odgovor od API-ja.");
        }
      } catch (error) {
        console.error('Greška pri dobavljanju izmešanih reči:', error);
      }
    };

    fetchScrambledWords();

    const getCurrentUserAndSetState = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error('Greška pri dobavljanju trenutnog korisnika:', error);
      }
    };

    getCurrentUserAndSetState();
  }, []);

  const promenaUnosa = (event) => {
    setUnos(event.target.value.toUpperCase());
  };

  const klikDugmeta = () => {
    if (unos !== "") {
      if (tacnaRec === unos) {
        setPoruka("Tačan Odgovor");
        setPoeni(poeni + 1);

        if (currentWordIndex < scrambledWords.length - 1) {
          setCurrentWordIndex(currentWordIndex + 1);
          setTacnaRec(scrambledWords[currentWordIndex + 1].correctWord);
        } else {
          setKrajIgre(true);
          submitScore(currentUser.id); // Čuvanje rezultata na back-u
        }
      } else {
        setPoruka("Pogrešan Odgovor");
        setKrajIgre(true);
        submitScore(currentUser.id); // Čuvanje rezultata na back-u
      }

      setUnos("");
    }
  };

  const pokreniIgru = () => {
    setIgraPocela(true);
    setUnos("");
    setPoruka("");
    setKrajIgre(false);
    setPoeni(0);
    setCurrentWordIndex(0);

    if (scrambledWords.length > 0) {
      setTacnaRec(scrambledWords[0].correctWord);
    } else {
      console.error("Greška: Nema izmešanih reči.");
    }
  };

  const resetujIgru = () => {
    setIgraPocela(false);
    setUnos("");
    setTacnaRec("");
    setPoruka("");
    setPoeni(0);
    setCurrentWordIndex(0);
    setKrajIgre(false);
  };

  const submitScore = async (userId) => {
    try {
      const response = await axios.post("https://localhost:5000/WordScramble/SubmitScore", {
        ucenikId: userId,
        score: poeni
      });
      
      console.log('Rezultat je sačuvan na backendu.', response.data);
    } catch (error) {
      console.error('Greška prilikom čuvanja rezultata:', error);
    }
  };
  
  return (
    <div className='word_scramble'>
      {!!poruka && (
        <div className='message'>
          <p>{poruka}</p>
        </div>
      )}

      {krajIgre && (
        <div className='message'>
          <p>Kraj Igre! Osvojili ste {poeni} poena.</p>
          <button className='start_game' onClick={resetujIgru}>
            Nova Igra
          </button>
        </div>
      )}

      {!krajIgre && (
        <>
          <h1>Mešanje Reči</h1>
          <div className='content'>
            {igraPocela && (
              <>
                <div className='board'>
                  {scrambledWords[currentWordIndex].scrambledWord.split("").map((el, i) => (
                    <span key={`${el}_${i}`} className='square_bg'>
                      {el}
                    </span>
                  ))}
                </div>
                <div className='field'>
                  <input
                    type='text'
                    onChange={promenaUnosa}
                    value={unos}
                    placeholder="Unesi reč"
                  />
                  <button type='button' onClick={klikDugmeta}>
                    Unesi
                  </button>
                </div>
              </>
            )}

            {!igraPocela && (
              <button className='start_game' type='button' onClick={pokreniIgru}>
                Pokreni Igru
              </button>
            )}

            {igraPocela && (
              <button className='start_game new' type='button' onClick={resetujIgru}>
                Nova Igra
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default WordScramble;
