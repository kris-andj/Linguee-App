import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { getToken, getCurrentUser} from '../services/AuthService';
import "./BiografijaProfesora.css";
import defaultProfesorImage from "./Assets/profesori.jpg";
import "./Kons";
import Illustration3 from "./Assets/Illustration3.svg";

const BiografijaProfesora = () => {
    const { username } = useParams();
    const [profesor, setProfesor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [error, setError] = useState('');
    const [currentUser, setCurrentUser] = useState(null); 

    useEffect(() => {
        const fetchProfesor = async () => {
            try {
                const token = getToken();
                if (!token) {
                    throw new Error('Nema dostupnog tokena.');
                }

                // dobavljanje imena korisnika iz URL-a
                const url = window.location.href;
                const parts = url.split('/');
                const username = parts[4];
                const indexOfDash = username.indexOf('-');
                const extractedString = username.substring(0, indexOfDash);
                console.log('Ime i prezime:', extractedString);

                //dobavljanje profesora na osnovu korisničkog imena
                const response = await axios.get(`https://localhost:5000/Projekat/PronadjiProfesoraPoKorisnickomImenu/${extractedString}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setProfesor(response.data);
            } catch (error) {
                console.error('Greška prilikom preuzimanja podataka profesora:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchCurrentUser = async () => {
            try {
                const user = await getCurrentUser();
                setCurrentUser(user);
            } catch (error) {
                console.error('Greška pri dobavljanju trenutnog korisnika:', error);
            }
        };

        fetchProfesor();
        fetchCurrentUser();
    }, [username]);

    const scheduleConsultation = async () => {
        try {
            const formattedDateTime = encodeURIComponent(selectedDate + ' ' + selectedTime);
            const token = getToken();
            if (!token) {
                throw new Error('Nema dostupnog tokena.');
            }

            const response = await axios.post(`https://localhost:5000/Projekat/ZakaziKonsultacijeKorisnika/${profesor.korisnickoIme}/${formattedDateTime}`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
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

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
        setError('');
    };

    const handleTimeChange = (event) => {
        setSelectedTime(event.target.value);
        setError('');
    };

    if (loading || !currentUser) return <div>Učitavanje...</div>;
    if (!profesor) return <div>Nema podataka o ovom profesoru.</div>;

    return (
        <div className="profesor-detalji-container">
            <img src={defaultProfesorImage} alt={`${profesor.ime} ${profesor.prezime}`} />
            <div className="info">
                <h1>{`${profesor.ime} ${profesor.prezime}`}</h1>
                <p>Korisničko ime: {profesor.korisnickoIme}</p>
                <p>Email: {profesor.email}</p>
                <p>Biografija: {profesor.biografija}</p>
                <p>Konsultacije: {profesor.konsultacije}</p>
            </div>
            <div className="konsultacije-section">
      <img className="kons-illustration" src={Illustration3} alt='Ilustracija3' />
      <h2>Zakaži konsultacije i reši sve nedoumice </h2>
      <p>Od 08:00 do 17:00 časova.</p>
                <div className="kalendar">
                    <input type="date" value={selectedDate} onChange={handleDateChange} />
                    <input type="time" value={selectedTime} onChange={handleTimeChange} />
                    <button onClick={scheduleConsultation}>Zakaži konsultacije</button>
                    {error && <p className="error-message">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default BiografijaProfesora;
