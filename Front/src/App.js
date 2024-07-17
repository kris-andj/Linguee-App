import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import Profil from './components/Profil';
import Onama from './components/Onama';
import HeroSection from './components/HeroSection';
import BiografijaProfesora from './components/BiografijaProfesora';
import PodnivoA from './components/PodnivoA';
import PodnivoB from './components/PodnivoB';
import Lekcije from './components/Lekcije';
import Lekcije2 from './components/Lekcije2';
import Game from './components/Game';
import YoutubeVideo from './components/YoutubeVideo';
import Header from './components/Header';
import Hero from './components/Hero';
import Prof from './components/Prof';
import Wordscramble from './components/Wordscramble';
import Cards from './components/Cards';
import Gramatika from './components/Gramatika';
import Registration from './components/Registration';
import Gramatika2 from './components/Gramatika2';
import Ocenjivanje from './components/Ocenjivanje';
import PrikaziOceneRoditelj from './components/PrikaziOceneRoditelj';
import PrikaziOcene from './components/PrikaziOcene';
import { setToken, getToken, removeToken, isAuthenticated, getCurrentUser } from './services/AuthService';
import ListaUcenika from './components/ListaUcenika';
import DodajLekcije from './components/DodajLekcije';
import TextShpere from './components/TextShpere';
import Chatbot from './components/Chatbot';
import Lekcije3 from './components/Lekcije3';
import Lekcije4 from './components/Lekcije4';
import ImageLink from './components/ImageLink';
import ImageLink2 from './components/ImageLink2';
import Gramatika3 from './components/Gramatika3';
import Gramatika7 from './components/Gramatika7';
import Gramatika4 from './components/Gramatika4';
import Gramatika5 from './components/Gramatika5';
import Gramatika8 from './components/Gramatika8';
import Gramatika9 from './components/Gramatika9';
import ListaKonsultacija from './components/ListaKonsultacija';
import ImageLink3 from './components/ImageLink3';
import ImageLink4 from './components/ImageLink4';

 
 
 
function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
 
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error('Greška pri dobavljanju trenutno prijavljenog korisnika:', error);
        removeToken();
      }
    };
    fetchUserData();
  }, []);
 
  const handleLogin = async (userData) => {
    try {
      const response = await axios.post('https://localhost:5000/Auth/Prijavljivanje', userData);
      const data = response.data;
      setUser(data.user);
      setToken(data.token);
      navigate('/profil');
    } catch (error) {
      console.error('Greška prilikom prijavljivanja:', error);
    }
  };
 
  const handleLogout = () => {
    removeToken();
    setUser(null);
    navigate('/prijavljivanje');
  };
 
  return (
    <>
      <Navbar />
      <Chatbot />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/upiskursa' element={<UpiskursaPage />} />
        <Route path="/profesori" element={<ProfesoriPage />} />
        <Route path="/prijavljivanje" element={<PrijavljivanjePage handleLogin={handleLogin} />} />
        <Route path="/registracija" element={<Registration />} />
        <Route path="/Onama" element={<OnamaPage />} />
        <Route path="/profesori/:profesorId" element={<BiografijaProfesoraPage />} />
        <Route path="/upiskursa-podnivoiA" element={<PodnivoAPage />} />
        <Route path="/upiskursa-podnivoiB" element={<PodnivoBPage />} />
        <Route path="/upiskursa-podnivoiA1-lekcije" element={<LekcijePage />} />
        <Route path="/upiskursa-podnivoiA2-lekcije" element={<Lekcije2Page />} />
        <Route path="/upiskursa-podnivoiA-lekcije-Kviz" element={<KvizPage />} />
        <Route path="/upiskursa-podnivoiA1-lekcije-vokabular" element={<VokabularPage />} />
        <Route path="/upiskursa-podnivoiA2-lekcije-vokabular" element={<Vokabular2Page />} />
        <Route path="/upiskursa-podnivoiA2-lekcije-gramatika" element={<Gramatika3Page />} />
        <Route path="/upiskursa-podnivoiA1-lekcije-gramatika" element={<GramatikaPage />} />
        <Route path="/upiskursa-podnivoiB1-lekcije" element={<Lekcije3Page />} />
        <Route path="/upiskursa-podnivoiB2-lekcije" element={<Lekcije4Page />} />
        <Route path="/upiskursa-podnivoiB-lekcije-Kviz" element={<GamePage />} />
        <Route path="/upiskursa-podnivoiB1-lekcije-vokabular" element={<Vokabular3Page />} />
        <Route path="/upiskursa-podnivoiB2-lekcije-vokabular" element={<Vokabular4Page />} />
        <Route path="/upiskursa-podnivoiB2-lekcije-gramatika" element={<Gramatika4Page />} />
        <Route path="/upiskursa-podnivoiB1-lekcije-gramatika" element={<Gramatika2Page />} />
        <Route path="/profil-oceni" element={<OceniPage />} />
        <Route path="/listakonsultacija" element={<ListaKonsultacijaPage/>}/>
        <Route path="/ocene" element={<PrikaziRoditeljPage />} />
        <Route path="/prikaziocene" element={<PrikaziOcenePage />} />
        <Route path="/lista-ucenika" element={<ListaucenikaPage />} />
        <Route path="/dodaj-lekcije" element={<DodavanjeLekcijaPage />} />
        <Route path="/animacija" element={<AnimacijaPage />} />
        <Route path="/profil" element={<ProfilPage user={user} onLogout={handleLogout} />} />
        <Route path="/upiskursa-podnivoiA1-lekcije-gramatika-1" element={<Lesson1Page />} />
        <Route path="/upiskursa-podnivoiA1-lekcije-gramatika-2" element={<Lesson2Page />} />
        <Route path="/upiskursa-podnivoiA2-lekcije-gramatika-1" element={<Lesson4Page />} />
        <Route path="/upiskursa-podnivoiA2-lekcije-gramatika-2" element={<Lesson5Page />} />
        <Route path="/upiskursa-podnivoiB1-lekcije-gramatika-1" element={<Lesson6Page />} />
        <Route path="/upiskursa-podnivoiB1-lekcije-gramatika-2" element={<Lesson7Page />} />
        <Route path="/upiskursa-podnivoiB2-lekcije-gramatika-1" element={<Lesson8Page />} />
        <Route path="/upiskursa-podnivoiB2-lekcije-gramatika-2" element={<Lesson9Page />} />
      </Routes>
      <Footer />
    </>
  );
}

 
const HomePage = () => {
  return (
    <>
      <HeroSection />
      <Cards />
      
    </>
  );
};
const ListaKonsultacijaPage = () => {
  return (
    <>
      <ListaKonsultacija />
      
    </>
  );
};
const Lesson1Page = () => {
  return (
    <>
     
      <Gramatika/>
    </>
  );
};

const Lesson4Page = () => {
  return (
    <>
     
      <Gramatika4/>
    </>
  );
};
const Lesson5Page = () => {
  return (
    <>
     
      <Gramatika5/>
    </>
  );
};
const Lesson6Page = () => {
  return (
    <>
     
      <Gramatika2/>
    </>
  );
};
const Lesson7Page = () => {
  return (
    <>
     
      <Gramatika7/>
    </>
  );
};
const Lesson8Page = () => {
  return (
    <>
     
      <Gramatika8/>
    </>
  );
};
const Lesson9Page = () => {
  return (
    <>
     
      <Gramatika9/>
    </>
  );
};
const Lesson2Page = () => {
  return (
    <>
     <Gramatika3/>
      
    </>
  );
};
 
const UpiskursaPage = () => {
  return (
    <>
      <Header />
      <Hero />
    </>
  );
};
const PrikaziRoditeljPage = () => {
  return (
    <>
      <PrikaziOceneRoditelj />
    </>
  );
};
const ListaucenikaPage = () => {
  return (
    <>
     <ListaUcenika/>
    </>
  );
};
const DodavanjeLekcijaPage = () => {
  return (
    <>
    <DodajLekcije/>
     
    </>
  );
};
const PrikaziOcenePage = () => {
  return (
    <>
      <PrikaziOcene />
    </>
  );
};

const OceniPage = () => {
  return (
    <>
      <Ocenjivanje />
    </>
  );
};
 
const ProfesoriPage = () => {
  return (
    <>
      <Prof />
      
    </>
  );
};
 
const PrijavljivanjePage = ({ handleLogin }) => {
  return (
    <>
      <Login onLogin={handleLogin} />
    </>
  );
};
 
const OnamaPage = () => {
  return (
    <>
      <Onama />
    </>
  );
};
 
const BiografijaProfesoraPage = () => {
  return (
    <>
      <BiografijaProfesora />
     
    </>
  );
};
 
const PodnivoAPage = () => {
  return (
    <>
      <PodnivoA />
    </>
  );
};
 
const PodnivoBPage = () => {
  return (
    <>
      <PodnivoB />
    </>
  );
};
 
const LekcijePage = () => {
  return (
    <>
      <Lekcije />
    </>
  );
};
 
const Lekcije2Page = () => {
  return (
    <>
      <Lekcije2 />
    </>
  );
};
const AnimacijaPage = () => {
  return (
    <>
      <TextShpere />
      
    </>
  );
};
 
const KvizPage = () => {
  return (
    <>
     
      <Wordscramble />
    </>
  );
};
 
const GamePage = () => {
  return (
    <>
      <Game />
    </>
  );
};
 
const VokabularPage = () => {
  const videoLinks = [
      "https://www.youtube.com/watch?v=8ZydJ_nznXA&t=2s",
      "https://www.youtube.com/watch?v=QeSquG_G_Cg",
      "https://www.youtube.com/watch?v=RjFCl7Mvofo&embeds_referring_euri=https%3A%2F%2Fwww.engvid.com%2F&embeds_referring_origin=https%3A%2F%2Fwww.engvid.com&source_ve_path=Mjg2NjY&feature=emb_logo",
      "https://www.youtube.com/watch?v=XwHZjVxTL74&embeds_referring_euri=https%3A%2F%2Fwww.engvid.com%2F&embeds_referring_origin=https%3A%2F%2Fwww.engvid.com&source_ve_path=Mjg2NjY&feature=emb_logo",
  ];
 
  return (
      <>
          <YoutubeVideo links={videoLinks} />
      </>
  );
};
 
const Vokabular2Page = () => {
  const videoLinks2=["https://www.youtube.com/watch?v=dQSXQkw7dx4&list=PLaNNx1k0ao1u-x_nKdKNh7cKALzelzXjY&index=126",
  "https://www.youtube.com/watch?v=10auVRva1Jk&list=PLaNNx1k0ao1u-x_nKdKNh7cKALzelzXjY&index=121",
  "https://youtu.be/o8QGGXJvmLQ?si=eJv_2EW3DqiWd-DZ",];
  return (
    <>
        <YoutubeVideo links={videoLinks2} />
    </>
);
};
 
const ProfilPage = ({ user, onLogout }) => {
  return (
    <>
      <Profil user={user} onLogout={onLogout} />
    </>
  );
};
 
const GramatikaPage = () => {
  return (
    <>
      <ImageLink />
      
    </>
  );
};
 
const Gramatika2Page = () => {
  return (
    <>
     <ImageLink3 />
    </>
  );
};
const Gramatika3Page = () => {
  return (
    <>
      <ImageLink2 />
    </>
  );
};
const Gramatika4Page = () => {
  return (
    <>
      <ImageLink4 />
    </>
  );
};
const Lekcije3Page = () => {
  return (
    <>
      <Lekcije3/>
    </>
  );
};
const Lekcije4Page = () => {
  return (
    <>
      <Lekcije4/>
    </>
  );
};
const Vokabular3Page = () => {
  const videoLinks3 = [
    "https://www.youtube.com/watch?v=SPNFtBVGmGU",
    "https://www.youtube.com/watch?v=H9zFDpu4nJw",
    "https://www.youtube.com/watch?v=XwHZjVxTL74&embeds_referring_euri=https%3A%2F%2Fwww.engvid.com%2F&embeds_referring_origin=https%3A%2F%2Fwww.engvid.com&source_ve_path=Mjg2NjY&feature=emb_logo",
];

return (
    <>
        <YoutubeVideo links={videoLinks3} />
    </>
);
};
const Vokabular4Page = () => {
  const videoLinks4=["https://www.youtube.com/watch?v=d_8tSKjYiRw",
    "https://www.youtube.com/watch?v=zY6bMOmsApM",
    "https://www.youtube.com/watch?v=lLqS8PK_pYs&t=2s",];
    return (
      <>
          <YoutubeVideo links={videoLinks4} />
      </>
  );
};
 
export default App;