import React from "react";
import "./PodnivoB.css";
import { Link } from "react-router-dom";
import Image3 from "./Assets/Image3.jpg";
import Image4 from "./Assets/Image4.jpg";
 
const PodnivoB = () => {
  return (
   
    <section className="podnivoB">
         
      <div className="image-container">
        <img className="image" src={Image3} alt="Slika 3" />
        <Link to='/upiskursa-podnivoiB1-lekcije'>
        <button className="enroll-button" >Upiši kurs B1</button>
        </Link>
      </div>
      <div className="image-container">
        <img className="image" src={Image4} alt="Slika 4" />
        <Link to='/upiskursa-podnivoiB2-lekcije'>
        <button className="enroll-button" >Upiši kurs B2</button>
        </Link>
      </div>
    </section>
  );
};
 
export default PodnivoB;
