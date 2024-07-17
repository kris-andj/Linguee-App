import React from "react";
import { Link } from "react-router-dom";
import "./PodnivoA.css";
import Image1 from "./Assets/Image1.jpg";
import Image2 from "./Assets/Image2.jpg";
 
const PodnivoA = () => {
  return (
    <section className="podnivoA">
      <div className="image-container">
        <img className="image" src={Image1} alt="Slika 1" />
        <Link to='/upiskursa-podnivoiA1-lekcije'>
          <button className="enroll-button">Upiši kurs A1</button>
        </Link>
      </div>
      <div className="image-container">
        <img className="image" src={Image2} alt="Slika 2" />
        <Link to='/upiskursa-podnivoiA2-lekcije'>
          <button className="enroll-button">Upiši kurs A2</button>
        </Link>
      </div>
    </section>
  );
};
 
export default PodnivoA;
