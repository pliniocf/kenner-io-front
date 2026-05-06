/* Página com todos os atributos necessários para cadastro de usuário
Terá que ser dividida entre cadastro do gerente e cadastro normal de
usuário */
import { useState } from 'react';
import Header from '../components/Header';
import DataTrabalho from '../components/DataTrabalho';
import MultiSelect from '../components/MultiSelect';
import axios from 'axios';

import './Cadastro.css'

function Cadastro() {

  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    telefone: "",
    email: "",
    senha: "",
    confirmSenha: "",
    funcionario: false,
    gerente: false
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value
    });
  }

  async function salvarUsuario() {

    if (form.senha !== form.confirmSenha) {
      alert('Senhas divergentes');
      return;
    }

    const perfil = form.gerente ? 'gerente' :
      form.funcionario ? 'funcionario' : 'cliente';
    
    const usuario = {
      nome: form.nome,
      cpf: form.cpf,
      telefone: form.telefone,
      email: form.email,
      senha: form.senha,
      perfil: perfil
    }

    try {
      const response = await axios.post('http://localhost:3000/usuarios', usuario);

      alert('Usuário cadastrado com sucesso!');
    } catch (err) {
      if (err.response) alert(err.response.data.message);
    }
  }

  return (
  <div>
    <Header></Header>
    <h1>Página de Cadastro</h1>
    <br/><input className="input" name="nome" value={form.nome} onChange={handleChange} placeholder="Nome" />
    <br/><br/><input className="input" name="cpf" value={form.cpf} onChange={handleChange} placeholder="CPF" />
    <br/><br/><input className="input" name="telefone" value={form.telefone} onChange={handleChange} placeholder="Telefone" />
    <br/><br/><input className="input" name="email" value={form.email} onChange={handleChange} placeholder="Email" />
    <br/><br/><input className="input" name="senha" value={form.senha} onChange={handleChange} type="password" placeholder="Senha" />
    <br/><br/><input className="input" name="confirmSenha" value={form.confirmSenha} onChange={handleChange} type="password" placeholder="Confirmação da Senha" />
    <br/><br/><input type="checkbox" name="funcionario" checked={form.funcionario} onChange={handleChange}/> Funcionário
    <input type="checkbox" name="gerente" checked={form.gerente} onChange={handleChange}/> Gerente
    
    {form.funcionario && <div >
      <h1>Dias:</h1>
      <DataTrabalho dia="2ª feira"></DataTrabalho>
      <DataTrabalho dia="3ª feira"></DataTrabalho>
      <DataTrabalho dia="4ª feira"></DataTrabalho>
      <DataTrabalho dia="5ª feira"></DataTrabalho>
      <DataTrabalho dia="6ª feira"></DataTrabalho>
      <DataTrabalho dia="Sábado"></DataTrabalho>
      <DataTrabalho dia="Domingo"></DataTrabalho>
      
      <h1>Trabalhos que realiza:</h1>
      <MultiSelect></MultiSelect>
    </div>}

    <br/><br/><button onClick={salvarUsuario} className='btn-salvar'>
      Salvar
    </button>
  </div>
  )

}

export default Cadastro;