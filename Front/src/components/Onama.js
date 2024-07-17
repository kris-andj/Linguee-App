
import React, { useEffect } from 'react';
import './Onama.css';
import Illustration4 from './Assets/Illustration4.svg';
 
const Onama = () => {
  const text = `O     nama: <br />Dobrodošli      na      naš      sajt      za      učenje      engleskog      jezika      za      decu      uzrasta      od      6      do      12      godina!<br />Naš      cilj      je      da      deca      uče      engleski      jezik      dok      se      zabavljaju.<br />Na      našem      sajtu      možete      pronaći      lekcije      u      pdf     i      video         formatu,<br />ali      i      zabavne      interaktivne      kvizove      koji      će      deci      pomoći      u      boljem      savladavanju      gradiva.<br />Pridružite      nam      se      u      ovoj      uzbudljivoj      avanturi      učenja!`;
 
  useEffect(() => {
    const elements = document.getElementsByClassName('char');
 
    for (let i = 0; i < elements.length; i++) {
      elements[i].addEventListener('animationend', function(e) {
        elements[i].classList.remove('animated');
      });
 
      elements[i].addEventListener('mouseover', function(e) {
        elements[i].classList.add('animated');
      });
    }
  }, []);
 
  const splitText = text.split('<br />').map((line, index) => (
    <React.Fragment key={index}>
      {line.split('').map((char, index) => (
        <span key={index} className="char">{char}</span>
      ))}
      <br />
    </React.Fragment>
  ));
 
  return (
    <div className="hover-effect-container">
      <div id="box">
        <h1 className="alpha">{splitText}</h1>
      </div>
    </div>
  );
};
 
export default Onama;