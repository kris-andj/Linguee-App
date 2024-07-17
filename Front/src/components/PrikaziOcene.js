import React, { useState, useEffect } from 'react';
import './PrikaziOcene.css';
import { getCurrentUser } from '../services/AuthService';
import axios from 'axios';

const PrikaziOcene = () => {
  const [ocene, setOcene] = useState([]);
  const [greska, setGreska] = useState('');

  useEffect(() => {
    const fetchOcene = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
          throw new Error('Trenutno prijavljeni korisnik nije pronađen.');
        }

        const token = localStorage.getItem('token');

        const response = await axios.get('https://localhost:5000/Projekat/PregledOcena', {
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
      } catch (error) {
        console.error('Greška pri dohvatanju ocena:', error.message);
        setGreska('Greška prilikom dohvatanja ocena.');
      }
    };

    fetchOcene();
  }, []);

  return (
    <div className="prikazi-ocene-container">
      {greska && <p className="greska">{greska}</p>}
      {ocene.length > 0 ? (
        <div className="ocene-container">
          <h2>Ocene učenika</h2>
          <ul>
            {ocene.map((ocena, index) => (
              <li key={index}>{ocena}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Trenutno nema dostupnih ocena.</p>
      )}
    </div>
  );
};

export default PrikaziOcene;

