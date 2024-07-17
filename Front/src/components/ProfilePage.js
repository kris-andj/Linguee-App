import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Profil from './Profil';

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('https://localhost:5000/Projekat/pronadjiKorisnika', {
      params: {
        korisnickoIme: 'imekorisnika' 
      }
    })
    .then(response => {
      setUser(response.data);
    })
    .catch(error => {
      console.error('Greška prilikom dohvatanja podataka o korisniku:', error);
    });
  }, []);

  return (
    <div>
      <h1>Profil korisnika</h1>
      {user ? <Profil user={user} /> : <p>Učitavanje...</p>}
    </div>
  );
};

export default ProfilePage;

