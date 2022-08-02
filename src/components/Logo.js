import React from 'react';
import logo from '../logo_trybe.png';
import '../styles/Logo.css';

function Logo() {
  return (
    <div className="logo">
      <img src={ logo } alt="Logo Trybe" />
      <p>
        <span id="trybe">Trybe</span>
        Wallet
      </p>
    </div>
  );
}

export default Logo;
