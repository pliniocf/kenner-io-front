import { useNavigate } from 'react-router-dom';
import './Header.css'

function Header() {
  const navigate = useNavigate();

  return ( 
    <div>
      <header className='header-landing'>
        <p className='opcoes' onClick={() => navigate('/')}>Home</p>
        <p className='opcoes' onClick={() => navigate('/servicos')}>Serviços</p>
        <button onClick={() => navigate('/login')} className='button-header-landing'>
          Login / Cadastro
        </button>
      </header>
    </div>
  );
}

export default Header;