
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Ispravljeno ime modula

// Funkcija za čuvanje tokena u localStorage
export const setToken = (token) => {
    localStorage.setItem('token', token);
};

// Funkcija za dobavljanje tokena iz localStorage
export const getToken = () => {
    return localStorage.getItem('token');
};

// Funkcija za brisanje tokena iz localStorage
export const removeToken = () => {
    localStorage.removeItem('token');
};

// Funkcija za proveru da li je korisnik autentifikovan
export const isAuthenticated = () => {
    const token = getToken();
    if (!token) return false;

    // Provera da li je token istekao
    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp > currentTime;
    } catch (error) {
        console.error('Greška prilikom dekodiranja tokena:', error);
        return false;
    }
};

// Funkcija za dobavljanje trenutno prijavljenog korisnika
export const getCurrentUser = async () => {
    const token = getToken();
    if (!token) throw new Error('Nema dostupnog tokena.');

    try {
        const response = await axios.get('https://localhost:5000/Projekat/CurrentUser', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Greška pri dobavljanju trenutnog korisnika:', error);
        throw error; // Propagira grešku dalje
    }
};

// Funkcija za dobavljanje pitanja sa servera
export const getQuestions = async () => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('Nema dostupnog tokena.');
        }

        const response = await axios.get('https://localhost:5000/QuizMilioner/GetQuestions', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Greška pri dobavljanju pitanja:', error);
        throw error;
    }
};
    export const checkUserRole = async () => {
        const token = getToken();
        if (!token) throw new Error('Nema dostupnog tokena.');
    
        try {
            const response = await axios.get('https://localhost:5000/Projekat/CheckUserRole', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data.role; 
        } catch (error) {
            console.error('Greška pri proveri uloge korisnika:', error);
            throw error; 
        }
};
  
