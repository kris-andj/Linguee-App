import React, { useState, useEffect } from "react";
import axios from 'axios';
import { getToken, removeToken, isAuthenticated } from "../services/AuthService";
import "./Kons.css";
import Illustration3 from "./Assets/Illustration3.svg";

const Kons = () => {
  const [odabraniDatum2, setOdabraniDatum2] = useState('');
  const [odabranoVreme2, setOdabranoVreme2] = useState('');
  const [error, setError] = useState('');
  

  useEffect(() => {
    
    async function fetchCurrentUser() {
      try {
        if (isAuthenticated()) {
          const response = await axios.get('https://localhost:5000/Projekat/CurrentUser', {
            headers: { Authorization: `Bearer ${getToken()}` }
          });
          console.log('Trenutni korisnik:', response.data);
        }
      } catch (error) {
        console.error('Greška pri dobavljanju trenutnog korisnika:', error);
        removeToken();
      }
    }

    fetchCurrentUser();
  }, []);

  const zakaziKonsultacije = async (profesorId, datum, vreme) => {
    try {
      const formattedDatum = encodeURIComponent(datum + ' ' + vreme);

      const response = await axios.post(`https://localhost:5000/Projekat/ZakaziKonsultacijeZaTrenutnogKorisnika/${profesorId}/${formattedDatum}`, {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        }
      });

      console.log('Konsultacije uspešno zakazane:', response.data);
      alert('Uspešno ste zakazali konsultacije. Uskoro Vam prosleđujemo mejl sa linkom za pristup sastanku. Nadamo se da će konsultacije uspešno rešiti sve nedoumice!');
      setError('');
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 409) {
          setError('Termin je već zauzet. Molimo izaberite drugi termin.');
        } else if (status === 400) {
          setError(data);
        } else {
          setError('Došlo je do greške prilikom zakazivanja konsultacija.');
        }
      } else {
        setError('Došlo je do greške prilikom zakazivanja konsultacija.');
      }
      console.error('Greška prilikom zakazivanja konsultacija:', error);
    }
  };

  const handleDatumChange2 = (event) => {
    setOdabraniDatum2(event.target.value);
    setError('');
  };

  const handleVremeChange2 = (event) => {
    setOdabranoVreme2(event.target.value);
    setError('');
  };

  return (
    <div className="konsultacije-section">
      <img className="kons-illustration" src={Illustration3} alt='Ilustracija3' />
      <h2>Zakaži konsultacije sa svojim profesorom i reši sve nedoumice </h2>
      <p>Od 08:00 do 17:00 časova.</p>
      <div className="kalendar">
        <input type="date" value={odabraniDatum2} onChange={handleDatumChange2} />
        <input type="time" value={odabranoVreme2} onChange={handleVremeChange2} />
        <button onClick={() => zakaziKonsultacije(11, odabraniDatum2, odabranoVreme2)}>Zakazi konsultacije</button>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Kons;
