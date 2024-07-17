
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../services/AuthService';
import axios from 'axios';

import "./Hero.css";
import ImageA from "./Assets/ImageA.jpg"; 
import ImageB from "./Assets/ImageB.jpg"; 

const Hero = () => {
  const navigate = useNavigate();
  const [poruka, setPoruka] = useState("");
  const [upisaniNivoi, setUpisaniNivoi] = useState([]);

  useEffect(() => {
    const fetchUceniciNaNivou = async () => {
      if (isAuthenticated()) {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get('https://localhost:5000/Projekat/UceniciNaNivou', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log(response);
          
          
          const nivoi = response.data.map(upisaniNivo => upisaniNivo.Nivo.NazivNivoa);
          setUpisaniNivoi(nivoi);
        } catch (error) {
          console.error('Greška prilikom preuzimanja upisanih nivoa:', error);
        }
      }
    };

    fetchUceniciNaNivou();
  }, []);

  const handleImageAClick = async () => {
    if (isAuthenticated()) {
      if (upisaniNivoi.includes('A')) {
        setPoruka('Već ste upisani na kurs A!');
        navigate("/upiskursa-podnivoiA");
        return;
      }

      try {
        const token = localStorage.getItem('token');
        const response = await axios.post('https://localhost:5000/Projekat/UpisiNivoSaOgranicenjem/A', {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (response.status === 200) {
          setPoruka("Uspešno ste se upisali na kurs A, odaberite podnivo i srećno u učenju!");
          setUpisaniNivoi([...upisaniNivoi, 'A']);
          navigate("/upiskursa-podnivoiA");
        } else {
          setPoruka('Neuspešan upis nivoa A');
        }
      } catch (error) {
        if (error.response && error.response.status === 403) {
          setPoruka('Kursevima mogu pristupiti samo učenici!');
        } else {
          setPoruka('Već ste upisani na ovaj kurs.');
        }
      }
    } else {
      setPoruka('Kursevima imaju pristup samo učenici!');
    }
  };

  const handleImageBClick = async () => {
    if (isAuthenticated()) {
      if (upisaniNivoi.includes('B')) {
        setPoruka('Već ste upisani na kurs B!');
        navigate("/upiskursa-podnivoiB");
        return;
      }

      try {
        const token = localStorage.getItem('token');
        const response = await axios.post('https://localhost:5000/Projekat/UpisiNivoSaOgranicenjem/B', {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (response.status === 200) {
          setPoruka("Uspešno ste se upisali na kurs B, odaberite podnivo i srećno u učenju!");
          setUpisaniNivoi([...upisaniNivoi, 'B']);
          navigate("/upiskursa-podnivoiB");
        } else {
          setPoruka('Neuspešan upis nivoa B');
        }
      } catch (error) {
        if (error.response && error.response.status === 403) {
          setPoruka('Kursevima mogu pristupiti samo učenici!');
        } else if (error.response && error.response.status === 500 && error.response.data === 'Niste prošli kviz sa više od 60% poena (6 od 10 poena), nije moguće upisati kurs B.') {
          setPoruka('');
        } else {
          setPoruka('Niste ostvarili više od 60% poena na kvizu i još uvek nemate pristup kursu B :). Probajte ponovo!');
        }
      }
    } else {
      setPoruka('Kursevima imaju pristup samo učenici!');
    }
  };

  return (
    <section className="hero">
      <div 
        className='message' 
        style={{
          position: 'fixed', 
          top: '40%', 
          left: '50%', 
          transform: 'translate(-50%, -10%)', 
          backgroundColor: '#F2B5D2', 
          border: '1px ', 
          padding: '10px', 
          fontSize: '30px', 
          zIndex: 1000,
          boxShadow: '2 3px 20px 0px #d0d0d0',
          borderRadius: '10px'
        }}
      >
        <p>{poruka}</p>
      </div>
      <div className="hero-images">
        <img
          className="hero-image"
          src={ImageA}
          alt="Slika A"
          onClick={handleImageAClick}
        />
        <img
          className="hero-image"
          src={ImageB}
          alt="Slika B"
          onClick={handleImageBClick}
        />
      </div>
      <div className="hero-content">
        <h1>Počni avanturu i izaberi nivo!</h1>
      </div>
    </section>
  );
};

export default Hero;

