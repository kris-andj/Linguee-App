import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../services/AuthService';
import './ListaUcenika.css';

const ListaUcenika = () => {
  const [ucenici, setUcenici] = useState([]);

  const fetchData = async () => {
    try {
      const token = getToken();
      const response = await axios.get('https://localhost:5000/Projekat/UceniciNaNivouAdmin', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data && response.data.ucenici && response.data.ucenici.$values) {
        const uceniciData = response.data.ucenici.$values.map(ucenik => ({
          id: ucenik.$id,
          ime: ucenik.ime,
          prezime: ucenik.prezime,
          korisnickoIme: ucenik.korisnickoIme,
          nivo: ucenik.nivo,
          wordScrambleScores: ucenik.wordScrambleScores ? ucenik.wordScrambleScores.$values : [],
          milionerScores: ucenik.milionerScores ? ucenik.milionerScores.$values : []
        }));
        setUcenici(uceniciData);
      } else {
        console.error('Greška: Neuspešno dobavljanje podataka o učenicima.');
        setUcenici([]);
      }
    } catch (error) {
      console.error('Greška pri dobavljanju korisnika:', error);
      setUcenici([]);
    }
  };

  const handleDelete = async (korisnickoIme, nivo) => {
    const confirmation = window.confirm('Da li ste sigurni da želite da uklonite ovog učenika sa nivoa?');
    if (confirmation) {
      try {
        const token = getToken();
        await axios.delete(`https://localhost:5000/Projekat/UkloniUcenikaSaNivoa/${korisnickoIme}/${nivo}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        fetchData();
        alert('Učenik uspešno obrisan sa nivoa.');
      } catch (error) {
        console.error('Greška prilikom brisanja učenika:', error);
      }
    }
  };

  useEffect(() => {
    fetchData(); 
  }, []); 

  return (
    <div className="table-container">
      <table>
        <thead className="table-header">
          <tr>
            <th className="table-cell">Ime</th>
            <th className="table-cell">Prezime</th>
            <th className="table-cell">Korisničko Ime</th>
            <th className="table-cell">Nivo</th>
            <th className="table-cell">Word Scramble Rezultati</th>
            <th className="table-cell">Milioner Rezultati</th>
            <th className="table-cell">Ukloniti sa kursa</th>
          </tr>
        </thead>
        <tbody>
          {ucenici.map((ucenik, index) => (
            <tr key={index} className="table-row">
              <td className="table-cell">{ucenik.ime}</td>
              <td className="table-cell">{ucenik.prezime}</td>
              <td className="table-cell">{ucenik.korisnickoIme}</td>
              <td className="table-cell">{ucenik.nivo}</td>
              <td className="table-cell">{ucenik.wordScrambleScores.join(', ')}</td>
              <td className="table-cell">{ucenik.milionerScores.join(', ')}</td>
              <td className="table-cell">
                <button className="action-button" onClick={() => handleDelete(ucenik.korisnickoIme, ucenik.nivo)}>
                  Ukloni učenika sa kursa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaUcenika;
