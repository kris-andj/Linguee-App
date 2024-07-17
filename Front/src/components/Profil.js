
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { removeToken, getToken, getCurrentUser } from '../services/AuthService'; 
import {jwtDecode} from 'jwt-decode'; 
import './Profil.css';

const Profil = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const currentUser = await getCurrentUser();
                setUser(currentUser);
            } catch (error) {
                console.error('Greška pri dobavljanju trenutnog korisnika:', error);
                navigate('/prijavljivanje');
            }
        };

        const token = getToken();
        if (!token) {
            navigate('/prijavljivanje');
            return;
        }

        try {
            const decodedToken = jwtDecode(token);
            fetchCurrentUser();
        } catch (error) {
            console.error('Greška pri dekodiranju tokena:', error);
            navigate('/prijavljivanje');
        }
    }, [navigate]);

    const handleLogout = () => {
        removeToken();
        setUser(null); 
        navigate('/prijavljivanje');
    };

    if (!user) {
        return <p>Učitavanje...</p>; 
    }

    return (
        <div className="profile-container">
            <h2>Profil</h2>
            <p>Ime: {user.ime}</p>
            <p>Prezime: {user.prezime}</p>
            <p>Korisničko ime: {user.korisnickoIme}</p>
            <p>Email: {user.email}</p>
            {user.uloga === 3 && <Link to='/profil-oceni'><button>Ocenjivanje</button></Link>}
            {user.uloga === 3 && <Link to='/listakonsultacija'><button>Lista zakazanih konsultacija</button></Link>}
            {user.uloga === 1 && <Link to='/ocene'><button>Pregled Ocena</button></Link>}
            {user.uloga === 2 && <Link to='/prikaziocene'><button>Prikaz Ocena</button></Link>}
            {user.uloga === 0 && <Link to='/lista-ucenika'><button>Prikaži listu upisanih učenika</button></Link> }
            {user.uloga ===0 && <Link to='/dodaj-lekcije'><button>Dodaj nove lekcije</button></Link>}
            
            <button onClick={handleLogout}>Odjavi se</button>
        </div>
    );
};

export default Profil;
