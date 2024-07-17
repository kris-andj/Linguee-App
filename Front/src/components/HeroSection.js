//import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import React, {useEffect, useState} from 'react';

function HeroSection(){
  const [sentences, setSentences]=useState([
    "Dobrodošli u 'Nauči engleski kroz igru'!",
    "Zaboravite na dosadne knjige i monotone lekcije.",
    "Naša aplikacija spaja učenje i zabavu kroz interaktivne igre i avanture.",
    "Pridruži nam se i otkrijte koliko učenje može biti zabavno!"
  ]);

  useEffect(()=>{
    const sentenceElements = document.querySelectorAll('.hero-container h1');
    sentenceElements.forEach((sentence, index)=>{
      setTimeout(()=>{
    sentence.classList.add('show');
  }, (index+1)*2000);
    });
  },[]);
  return(
    <div className='hero-container'>
      <video src='/videos/video-5.mp4' autoPlay loop muted/>
      {sentences.map((sentence, index)=>(
        <h1 key={index} className='sentence'>{sentence}</h1>
      ))}
      <p>Započni avanturu!</p>
      <div className='hero-btns'>
        <Button
        className='btns'
        buttonStyle='btn--outline'
        buttonSize='btn--large'
        linkTo='/prijavljivanje'
        >
          Započni
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;

