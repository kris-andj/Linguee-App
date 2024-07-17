import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./TextShpere.css";
import TagCloud from "TagCloud";

const TextShpere = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const container = ".tagcloud";
    const texts = [
        "apple",
        "pplea",
        "bus",
        "ubs",
        "bread",
        "reabd",
        "PristupiKvizu",
        "PritisniSTART",
        "yellow",
        "blue",
        "uble",
        "hello",
        "love",
        "START"
    ];

    const options = {
      radius: 300,
      maxSpeed: "normal",
      initSpeed: "normal",
      keep: true,
    };

    TagCloud(container, texts, options);

    
    setTimeout(() => {
      const items = document.querySelectorAll(".tagcloud--item");
      items.forEach(item => {
        if (item.innerText === "START") {
          item.classList.add("start-item");
          item.addEventListener("click", () => {
            navigate("/upiskursa-podnivoiA-lekcije-Kviz");
          });
        }
      });
    }, 500); 

  }, [navigate]);

  return (
    <div className="text-shpere">
      <span className="tagcloud"></span>
    </div>
  );
};

export default TextShpere;