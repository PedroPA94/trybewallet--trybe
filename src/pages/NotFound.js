import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import '../styles/NotFound.css';

function NotFound() {
  return (
    <div className="container">
      <Logo />
      <h2>Página não encontrada</h2>
      <Link to="/">Retornar à página de login</Link>
    </div>
  );
}

export default NotFound;
