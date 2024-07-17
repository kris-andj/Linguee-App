import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from '../services/AuthService';
import './ListaKonsultacija.css';

const ListaKonsultacija = () => {
  const [konsultacije, setKonsultacije] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchConsultations = async () => {
    try {
      const token = getToken();
      const response = await axios.get('https://localhost:5000/Projekat/ListaZakazanihKonsultacija', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data && response.data.$values) {
        setKonsultacije(response.data.$values);
      } else {
        console.error('Greška: Nema zakazanih konsultacija.');
        setKonsultacije([]);
      }
    } catch (error) {
      console.error('Greška pri dobavljanju zakazanih konsultacija:', error);
      setError('Greška pri dobavljanju zakazanih konsultacija.');
      setKonsultacije([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConsultations();
  }, []);

  if (loading) {
    return <p>Učitavanje...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="consultations-kontejner">
      <h2>Zakazane konsultacije</h2>
      <table className="consultations-list">
        <thead>
          <tr>
            <th>Ime</th>
            <th>Prezime</th>
            <th>Termin</th>
          </tr>
        </thead>
        <tbody>
          {konsultacije.length === 0 ? (
            <tr>
              <td colSpan="3">Nema zakazanih konsultacija.</td>
            </tr>
          ) : (
            konsultacije.map((konsultacija, index) => (
              <tr key={index}>
                <td>{konsultacija.ime}</td>
                <td>{konsultacija.prezime}</td>
                <td>{new Date(konsultacija.termin).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListaKonsultacija;

