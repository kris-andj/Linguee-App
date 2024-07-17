import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <h1>Dobrodošli na kurseve engleskog jezika!</h1>
      <p>
        Istražite naše sjajne sadržaje i naučite kroz igru.<br />
        U ponudi imamo:<br/> kurs{" "}
        <span style={{ color: "#ff69b4", fontWeight: "bold" }}>A - za početnike</span> i kurs{" "}
        <span style={{ color: "#ff69b4", fontWeight: "bold" }}>B - za napredniji nivo znanja.</span><br />
        Srećno!
      </p>
    </header>
  );
};

export default Header;
