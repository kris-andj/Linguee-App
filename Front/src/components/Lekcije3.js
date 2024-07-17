import React from 'react';
import './Lekcije.css';
import { useNavigate } from "react-router-dom";
import Gramatika from "./Assets/gramatika.jpg";
import Vokabular from "./Assets/vokabular.jpg";
import Kviz from "./Assets/kviz.png";
 
const Lekcije3 = () => {
  const navigate = useNavigate();
 
  const handleGramatikaClick = () => {
    navigate('/upiskursa-podnivoiB1-lekcije-gramatika');
  };
 
  const handleVokabularClick = () => {
    navigate('/upiskursa-podnivoiB1-lekcije-vokabular');
  };
 
  const handleKvizClick = () => {
    navigate('/upiskursa-podnivoiB-lekcije-Kviz');
  };
 
  return (
    <section className="lekcije">
        <p>Lekcije:</p>
      <div className="lekcije-images">
        <img
          className="lekcije-image"
          src={Gramatika}
          alt="Slika A"
          onClick={handleGramatikaClick}
        />
        <img
          className="lekcije-image"
          src={Vokabular}
          alt="Slika B"
          onClick={handleVokabularClick}
        />
        <img
          className="lekcije-image"
          src={Kviz}
          alt="Slika C"
          onClick={handleKvizClick}
        />
      </div>
     
     
    </section>
  );
};
export default Lekcije3;