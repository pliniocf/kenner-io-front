import { useNavigate } from 'react-router-dom';
import './Header.css'

function getFirstName(name) {
  return name.split(' ')[0]
}

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
        <div className='menu-esquerda'>
          <p className='opcoes' onClick={() => navigate('/')}>Home</p>
          <p className='opcoes' onClick={() => navigate('/servicos')}>Serviços</p>
        </div>
        <div className='menu-direita'>
          {localStorage.getItem('usuario') &&
            <p className='nome-header'>Olá {getFirstName(JSON.parse(localStorage.getItem('usuario')).nome)}</p>
          }
          <button onClick={localStorage.getItem('token') ? realizarLogout : () => navigate('/login')} className='button-header-landing'>
            { localStorage.getItem('token') ? 'Sair' : 'Login / Cadastro'}
          </button>
        </div>
      </header>
    </div>
  );
}

export default Header;