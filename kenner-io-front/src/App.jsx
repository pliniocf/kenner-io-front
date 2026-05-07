/* Landing */

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import homeImg from './assets/home.jpg'
import './App.css'

import { useNavigate } from 'react-router-dom';

import Header from './components/Header'

function App() {
  
  return (
    <div>
      <Header></Header>
      <main>
        <h1 className="home-title">Marquei</h1>
        <img
          src={homeImg}
          alt="Imagem principal"
          className="home-image"
        />
      </main>
    </div>
  );
}

export default App
