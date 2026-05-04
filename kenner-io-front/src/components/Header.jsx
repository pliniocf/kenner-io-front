import { useNavigate } from 'react-router-dom';
import './Header.css'

function Header() {
  const navigate = useNavigate();

  return ( 
    <div>
      <header className='header-landing'>
        <button onClick={() => navigate("/login")} className='button-header-landing'>
          Login / Cadastro
        </button>
      </header>
    </div>
  );
}

export default Header;