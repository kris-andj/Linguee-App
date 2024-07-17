import React from 'react';
import './Lekcije.css';
import { useNavigate } from "react-router-dom";
import Lesson1 from "./Assets/lesson1.png";
import Lesson2 from "./Assets/lesson2.png";

 
const ImageLink = () => {
  const navigate = useNavigate();
 
  const handleLesson1Click = () => {
    navigate('/upiskursa-podnivoiA1-lekcije-gramatika-1');
  };
 
  const handleLesson2Click = () => {
    navigate('/upiskursa-podnivoiA1-lekcije-gramatika-2');
  };
 
  
 
  return (
    <section className="lekcije">
        <p>Lekcije:</p>
      <div className="lekcije-images">
        <img
          className="lekcije-image"
          src={Lesson1}
          alt="Slika A"
          onClick={handleLesson1Click}
        />
        <img
          className="lekcije-image"
          src={Lesson2}
          alt="Slika B"
          onClick={handleLesson2Click}
        />
        
      </div>
     
     
    </section>
  );
};
export default ImageLink;



