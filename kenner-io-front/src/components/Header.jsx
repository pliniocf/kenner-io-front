import { useNavigate } from 'react-router-dom';
import './Header.css'

function Header() {
  const navigate = useNavigate();

  function realizarLogout() {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      navigate('/');
    }
  }

  return ( 
    <div>
      <header className='header-landing'>
        <p className='opcoes' onClick={() => navigate('/')}>Home</p>
        <p className='opcoes' onClick={() => navigate('/servicos')}>Serviços</p>
        <button onClick={localStorage.getItem('token') ? realizarLogout : () => navigate('/login')} className='button-header-landing'>
          { localStorage.getItem('token') ? 'Sair' : 'Login / Cadastro'}
        </button>
      </header>
    </div>
  );
}

export default Header;