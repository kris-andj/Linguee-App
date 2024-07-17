
import React, { useState } from "react";
import './Registracija.css';
import user_icon from './Assets/person.png';
import email_icon from './Assets/email.png';
import password_icon from './Assets/password.png';

const Registration = () => {
    const [ime, setIme] = useState('');
    const [prezime, setPrezime] = useState('');
    const [email, setEmail] = useState('');
    const [korisnickoIme, setKorisnickoIme] = useState('');
    const [lozinka, setLozinka] = useState('');
    const [uloga, setUloga] = useState(2); 
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/Auth/Register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ime, prezime, email, korisnickoIme, lozinka, uloga }),
            });
            if (!response.ok) {
                throw new Error('Greska tokom registracije');
            }
            const data = await response.json();
            console.log('Registracija uspesna:', data);
            setError('');
        } catch (error) {
            console.error('Error during registration:', error);
            setError('Registracija neuspesna: ' + error.message);
        }
    };

    return (
        <div className="container">
            <div className="header">
                <div className="text">Registrovanje</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <img src={user_icon} alt=""/>
                    <input
                        type="text"
                        placeholder="Ime"
                        value={ime}
                        onChange={(e) => setIme(e.target.value)}
                    />
                </div>
                <div className="input">
                    <img src={user_icon} alt=""/>
                    <input
                        type="text"
                        placeholder="Prezime"
                        value={prezime}
                        onChange={(e) => setPrezime(e.target.value)}
                    />
                </div>
                <div className="input">
                    <img src={email_icon} alt=""/>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input">
                    <img src={user_icon} alt=""/>
                    <input
                        type="text"
                        placeholder="Korisnicko Ime"
                        value={korisnickoIme}
                        onChange={(e) => setKorisnickoIme(e.target.value)}
                    />
                </div>
                <div className="input">
                    <img src={password_icon} alt=""/>
                    <input
                        type="password"
                        placeholder="Lozinka"
                        value={lozinka}
                        onChange={(e) => setLozinka(e.target.value)}
                    />
                </div>
                <div className="role-selection">
                
                    <label>
                        <input
                            type="radio"
                            value={2}
                            checked={uloga === 2}
                            onChange={(e) => setUloga(Number(e.target.value))}
                        />
                        Učenik
                    </label>
                    <label>
                        <input
                            type="radio"
                            value={3}
                            checked={uloga === 3}
                            onChange={(e) => setUloga(Number(e.target.value))}
                        />
                        Profesor
                    </label>
                </div>
            </div>
            {error && <div className="error">{error}</div>}
            <div className="submit" onClick={handleRegister}>
                Registruj se
            </div>
        </div>
    );
};

export default Registration;
