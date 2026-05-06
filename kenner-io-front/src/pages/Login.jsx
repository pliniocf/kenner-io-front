/* Página que vai ter os campos de login, senha e link para cadastro */
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

import Header from '../components/Header';
import './Login.css'


function Login() {
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    email: "",
    senha: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value
    });
  }

  async function realizarLogin() {

    if (!form.email || !form.senha) {
      alert('Login e senha precisam ser preenchidos');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/usuarios/login', form);
      const { token, usuario } = response.data;

      localStorage.setItem("token", token);

      localStorage.setItem("usuario", JSON.stringify(usuario));

      navigate("/cadastro");

    } catch (err) {
      if (err.response) alert(err.response.data.message);
    }
  }

  return (
    <div>
      <Header></Header>
      <br/><h1>Insira seus dados</h1>
      <br/><input className="input" name="email" value={form.email} onChange={handleChange} placeholder="Email" />
      <br/><br/><input className="input" name="senha" value={form.senha} onChange={handleChange} type="password" placeholder="Senha" />
      <br/><br/><button onClick={realizarLogin} className='btn-salvar'>
        Entrar
      </button>
      <br/><br/><h4 className="txt-cadastro" onClick={() => navigate("/cadastro")}>Não possui cadastro? Clique aqui!</h4>
    </div>
  )

}

export default Login;