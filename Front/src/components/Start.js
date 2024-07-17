import React, { useRef, useEffect, useState } from "react";
import { getCurrentUser } from '../services/AuthService';

const Start = ({ setUsername, startGame }) => {
  const inputRef = useRef();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const getCurrentUserAndSetState = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error('Greška pri dobavljanju trenutnog korisnika:', error);
      }
    };

    getCurrentUserAndSetState();
  }, []);

  const handleClick = () => {
    const inputValue = inputRef.current.value.trim();
    if (inputValue) {
      setUsername(inputValue);
      startGame();
    }
  };

  return (
    <div className="start">
      {currentUser ? (
        <div>
          <h1>Welcome, {currentUser.name}!</h1>
          <input
            className="startInput"
            placeholder="Enter your name"
            ref={inputRef}
          />
          <button className="startButton" onClick={handleClick}>
            Start
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Start;




