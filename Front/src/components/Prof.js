
import "./Prof.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import profesorImg from "./Assets/profesori.jpg";
import axios from 'axios';
import { getToken, isAuthenticated} from '../services/AuthService';

const defaultProfesorImage = profesorImg;

const Prof = () => {
    const [profesori, setProfesori] = useState([]);

    useEffect(() => {
        const fetchProfesori = async () => {
            try {
                const token = getToken();
                if (!token) {
                    throw new Error('Nema dostupnog tokena.');
                }

                const response = await axios.get("https://localhost:5000/Projekat/PrikaziProfesore", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log('Odgovor sa servera:', response);

                if (response.data && response.data.$values && Array.isArray(response.data.$values)) {
                    const profesoriSaSlikama = response.data.$values.map(profesor => ({
                        ...profesor,
                        slika: defaultProfesorImage
                    }));
                    setProfesori(profesoriSaSlikama);
                } else {
                    console.error('Očekivan je niz, ali je dobijen:', response.data);
                }
            } catch (error) {
                console.error('Greška prilikom preuzimanja profesora:', error);
            }
        };

        fetchProfesori();
    }, []);

    return (
        <div className="profesori-container">
            {profesori.map((profesor, index) => (
                <Link key={index} to={`/profesori/${profesor.korisnickoIme.toLowerCase()}-${profesor.prezime.toLowerCase()}-biografija-konsultacije`} className="profesor-link">
                    <div className="profesor">
                        <img src={profesor.slika} alt={`${profesor.ime} ${profesor.prezime}`} />
                        <div className="info">
                            <h3>{`${profesor.ime} ${profesor.prezime}`}</h3>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Prof;
