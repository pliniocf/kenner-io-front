/* Landing */

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

import { useNavigate } from 'react-router-dom';

import Header from './components/Header'

function App() {
  
  return (
    <div>
      <Header></Header>
      <main>
        <h1>Home</h1>
      </main>
    </div>
  );
}

export default App
