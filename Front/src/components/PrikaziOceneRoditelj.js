import React, { useState, useEffect } from 'react';
import './PrikaziOcene.css';
import './PrikaziOceneRoditelj.css';
import { getToken, getCurrentUser } from '../services/AuthService';
import axios from 'axios';

const PrikaziOcene = () => {
  const [ocene, setOcene] = useState([]);
  const [greska, setGreska] = useState('');
  const [korisnickoImeUcenika, setKorisnickoImeUcenika] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

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

  const fetchOcene = async () => {
    try {
      const token = getToken();
      if (!token || !currentUser) {
        throw new Error('Nema dostupnog tokena ili korisnik nije autentifikovan.');
      }

      const response = await axios.get(`https://localhost:5000/Projekat/PregledOcenaDeteta/${korisnickoImeUcenika}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });console.log(response)

      if (!response.data || !Array.isArray(response.data.$values)) {
        throw new Error('Nema podataka o ocenama ili podaci nisu u očekivanom formatu.');
      }

      
      const oceneData = response.data.$values;
      setOcene(oceneData);
      setGreska('');
      console.log(response.data.$values)
    } catch (error) {
      console.error('Greška pri dohvatanju ocena:', error.message);
      setOcene([]);
      setGreska('Greška prilikom dohvatanja ocena.');
    }
  };

  const handleInputChange = (event) => {
    setKorisnickoImeUcenika(event.target.value);
  };

  const handleButtonClick = async () => {
    await fetchOcene();
  };

  return (
    <div className="prikazi-ocene-container">
      <form className="prikazi-ocene-form">
        <div>
          <label htmlFor="korisnickoImeUcenika">Korisničko ime učenika:</label>
          <input 
            type="text" 
            id="korisnickoImeUcenika"
            value={korisnickoImeUcenika} 
            onChange={handleInputChange} 
            placeholder="Unesite korisničko ime učenika"
          />
        </div>
        <button type="button" onClick={handleButtonClick}>Prikaži ocene</button>
      </form>
      {greska && <p className="greska">{greska}</p>}
      {ocene.length > 0 ? (
        <div className="ocene-container">
          <h2>Ocene učenika: {korisnickoImeUcenika}</h2>
          <ul>
            {ocene.map((ocena, index) => (
              <li key={index}>{ocena}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p> </p>
      )}
    </div>
  );
};

export default PrikaziOcene;

