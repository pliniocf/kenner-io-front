/* Página que vai ter os campos de login, senha e link para cadastro */
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import './Login.css'

function Login() {
  const navigate = useNavigate();

  return (
    <div>
      <Header></Header>
      <br/><h1>Insira seus dados</h1>
      <br/><input className="input" placeholder="Email" />
      <br/><br/><input className="input" placeholder="Senha" />
      <br/><br/><h4 className="txt-cadastro" onClick={() => navigate("/cadastro")}>Não possui cadastro? Clique aqui!</h4>
    </div>
  )

}

export default Login;