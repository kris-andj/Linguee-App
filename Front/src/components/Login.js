

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from 'jwt-decode';
import './Login.css';
import user_icon from './Assets/person.png';
import email_icon from './Assets/email.png';
import password_icon from './Assets/password.png';
import axios from 'axios';
import { setToken, getToken, removeToken, isAuthenticated } from '../services/AuthService';

const Login = () => {
    const navigate = useNavigate();
    const [action, setAction] = useState("Prijavljivanje");
    const [korisnickoIme, setKorisnickoIme] = useState('');
    const [ime, setIme] = useState('');
    const [prezime, setPrezime] = useState('');
    const [email, setEmail] = useState('');
    const [lozinka, setLozinka] = useState('');
    const [uloga, setUloga] = useState(2); 
    const [showResetPassword, setShowResetPassword] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [resetUsername, setResetUsername] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [user, setUser] = useState(null);

    const handleLogout = () => {
        removeToken();
        setUser(null);
        navigate('/prijavljivanje'); 
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post('https://localhost:5000/Auth/Prijavljivanje', {
                korisnickoIme, lozinka
            });
            const data = response.data;

            setError('');
            setToken(data); 

            const userResponse = await axios.get('https://localhost:5000/Projekat/PronadjiKorisnika', {
                params: {
                    korisnickoIme: korisnickoIme
                },
                headers: { Authorization: `Bearer ${data}` } 
            });
            
            setUser(userResponse.data);
            navigate('/profil'); 

        } catch (error) {
            console.error('Greška prilikom prijavljivanja:', error);
            setError('Neuspješno prijavljivanje: ' + error.message);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://localhost:5000/Auth/Register', {
                ime, prezime, email, korisnickoIme, lozinka, uloga
            });
            console.log('Registracija uspješna:', response.data);
            setError('');
            setSuccessMessage('Registracija uspješna.');
            setAction("Prijavljivanje"); 
        } catch (error) {
            console.error('Greška tokom registracije:', error);
            setError('Registracija neuspješna: ' + error.message);
        }
    };

    const handleResetPassword = async () => {
        if (newPassword !== confirmNewPassword) {
            setError("Lozinke se ne poklapaju!");
            return;
        }
        if (newPassword.length < 4) {
            setError("Lozinka mora imati najmanje 4 karaktera.");
            return;
        }
    
        try {
            const response = await axios.put('https://localhost:5000/Projekat/AzuriranjeLozinke', {
                korisnickoIme: resetUsername, novaLozinka: newPassword, potvrdaNoveLozinke: confirmNewPassword
            });
            console.log('Lozinka uspješno promijenjena:', response.data);
            setError('');
            setSuccessMessage('Lozinka je uspješno promijenjena. Sada se možete prijaviti ponovo.');
            setShowResetPassword(false);
            setAction("Prijavljivanje");
        } catch (error) {
            console.error('Greška prilikom mijenjanja lozinke:', error);
            setError('Neuspješna promjena lozinke: ' + error.message);
        }
    };
    

    useEffect(() => {
        if (isAuthenticated()) {
            axios.get('https://localhost:5000/Projekat/CurrentUser', {
                headers: { Authorization: `Bearer ${getToken()}` }
            }).then(response => {
                setUser(response.data.user);
            }).catch(() => {
                removeToken();
            });
        }
    }, []);

    return (
        <div className="container">
            <div className="log">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                {action === "Prijavljivanje" ? null : (
                    <>
                        <div className="input">
                            <img src={user_icon} alt=""/>
                            <input type="text" value={ime} onChange={(e) => setIme(e.target.value)} placeholder="Ime"/>
                        </div>
                        <div className="input">
                            <img src={user_icon} alt=""/>
                            <input type="text" value={prezime} onChange={(e) => setPrezime(e.target.value)} placeholder="Prezime"/>
                        </div>
                        <div className="input">
                            <img src={email_icon} alt=""/>
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
                        </div>
                    </>
                )}
                <div className="input">
                    <img src={user_icon} alt=""/>
                    <input 
                        type="text" 
                        placeholder="Korisničko ime" 
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
                {action === "Registrovanje" && (
                    <div className="role-selection">
                        <label>
                            <input type="radio" value="1" checked={uloga === 1} onChange={() => setUloga(1)} />
                            Roditelj
                        </label>
                        <label>
                            <input type="radio" value="2" checked={uloga === 2} onChange={() => setUloga(2)} />
                            Učenik
                        </label>
                        <label>
                            <input type="radio" value="3" checked={uloga === 3} onChange={() => setUloga(3)} />
                            Profesor
                        </label>
                    </div>
                )}
            </div>
            {action === "Registrovanje" ? null : (
                <div className="forgot-password" onClick={() => setShowResetPassword(true)}>
                    Zaboravili ste šifru? <span>Kliknite ovde!</span>
                </div>
            )}

            <div className="submit-container">
                <button 
                    className={action === "Prijavljivanje" ? "submit gray" : "submit"} 
                    onClick={() => setAction("Registrovanje")}
                >
                    Registrovanje
                </button>

                <button 
                    className={action === "Registrovanje" ? "submit gray" : "submit"} 
                    onClick={() => setAction("Prijavljivanje")}
                >
                    Prijavljivanje
                </button>
            </div>

            <div className="submit-container">
                {action === "Prijavljivanje" ? (
                    <button className="submit" onClick={handleLogin}>
                        Prijavi se
                    </button>
                ) : (
                    <button className="submit" onClick={handleRegister}>
                        Registruj se
                    </button>
                )}
            </div>

            {showResetPassword && (
                <div className="reset-password-container">
                    <div className="input">
                        <img src={user_icon} alt=""/>
                        <input 
                            type="text" 
                            placeholder="Korisničko ime" 
                            value={resetUsername} 
                            onChange={(e) => setResetUsername(e.target.value)} 
                        />
                    </div>
                    <div className="input">
                        <img src={password_icon} alt=""/>
                        <input 
                            type="password" 
                            placeholder="Nova lozinka" 
                            value={newPassword} 
                            onChange={(e) => setNewPassword(e.target.value)} 
                        />
                    </div>
                    <div className="input">
                        <img src={password_icon} alt=""/>
                        <input 
                            type="password" 
                            placeholder="Potvrdi novu lozinku" 
                            value={confirmNewPassword} 
                            onChange={(e) => setConfirmNewPassword(e.target.value)} 
                        />
                    </div>
                    <div className="submit-container">
                        <button className="submit" onClick={handleResetPassword}>
                            Promeni lozinku
                        </button>
                        
                    </div>
                </div>
            )}

            {error && <div className="error">{error}</div>}
            {successMessage && <div className="success">{successMessage}</div>}
        </div>
    );
};

export default Login;







