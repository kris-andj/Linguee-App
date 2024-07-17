import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/img-11.jpg'
              text='Upisi kurs i nauči engleski kroz igru'
              label='Kurs'
              path='/upiskursa'
            />
            <CardItem
              src='images/img-10.jpg'
              text='Informacije o nama'
              label='Informacije'
              path='/onama'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/img-13.jpg'
              text='Ovo su naši profesori'
              label='Profesori'
              path='/profesori'
            />
            <CardItem
              src='images/img-12.jpg'
              text='Prijavi se'
              label='Forma za prijavljivanje'
              path='/prijavljivanje'
            />
            
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;