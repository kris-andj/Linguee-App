import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { useLocation } from 'react-router-dom';
import './Chatbot.css';

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [position, setPosition] = useState({ top: '10%', left: '10%' });
  const location = useLocation();

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({ top: `${event.clientY}px`, left: `${event.clientX}px` });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const messages = {
      '/': 'Dobrodošli na naš sajt.',
     
    };

    const currentMessage = messages[location.pathname] || '';
    setMessage(currentMessage);
  }, [location.pathname]);

  return (
    <div>
      <div className="chatbot" style={position}>
        <animated.div
          style={useSpring({ opacity: 1, from: { opacity: 0 } })}
          className="chatbot-message"
        >
          {message}
        </animated.div>
        <img src="/images/robot.png" alt="robot" className="robot-image" />
      </div>
    </div>
  );
};

export default Chatbot;
