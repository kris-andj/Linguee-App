import React from 'react';

const Logout = ({ handleLogout }) => {
  return (
    <button onClick={handleLogout}>Odjavi se</button>
  );
};

export default Logout;
