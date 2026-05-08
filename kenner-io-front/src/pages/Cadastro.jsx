/* Página com todos os atributos necessários para cadastro de usuário
Terá que ser dividida entre cadastro do gerente e cadastro normal de
usuário */
import { useState, useEffect } from 'react';
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
    gerente: false,
    hora_entrada: "",
    hora_saida: ""
  });
  
  const [servicos, setServicos] = useState([]);
  const [servicosSelecionados, setServicosSelecionados] = useState([]);

  async function buscarServicos() {
    try {

      const response = await axios.get('http://localhost:3000/servicos');

      setServicos(response.data);

    } catch (err) {
      console.log(err);
      alert('Erro ao buscar serviços');
    }
  }

  useEffect(() => {
    buscarServicos();
  }, []);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    if (name === 'funcionario') {
      setForm({
        ...form,
        funcionario: checked,
        gerente: false
      });
      return;
    }

    if (name === 'gerente') {
      setForm({
        ...form,
        gerente: checked,
        funcionario: false
      });
      return;
    }

    setForm({
      ...form,
      [name]:
        type === 'checkbox' ? checked : value
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
      perfil: perfil,
      hora_entrada: form.funcionario ? new Date(`1970-01-01T${form.hora_entrada}:00`) : null,
      hora_saida: form.funcionario ? new Date(`1970-01-01T${form.hora_saida}:00`) : null,
      servicos: servicosSelecionados.length > 0 &&
        servicosSelecionados.map(servico => servico.value)
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
      <Header />
      <div className="container-cadastro">
        <h1 className="titulo-cadastro">Página de Cadastro</h1>
        <div className="campo-linha">
          <label>Nome</label>
          <input
            className="input-cadastro"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            placeholder="Digite seu nome"
          />
        </div>
        <div className="campo-linha">
          <label>CPF</label>
          <input
            className="input-cadastro"
            name="cpf"
            value={form.cpf}
            onChange={handleChange}
            placeholder="Digite seu CPF"
          />
        </div>
        <div className="campo-linha">
          <label>Telefone</label>
          <input
            className="input-cadastro"
            name="telefone"
            value={form.telefone}
            onChange={handleChange}
            placeholder="Digite seu telefone"
          />
        </div>
        <div className="campo-linha">
          <label>Email</label>
          <input
            className="input-cadastro"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Digite seu email"
          />
        </div>
        <div className="campo-linha">
          <label>Senha</label>
          <input
            className="input-cadastro"
            type="password"
            name="senha"
            value={form.senha}
            onChange={handleChange}
            placeholder="Digite sua senha"
          />
        </div>
        <div className="campo-linha">
          <label>Confirmar senha</label>
          <input
            className="input-cadastro"
            type="password"
            name="confirmSenha"
            value={form.confirmSenha}
            onChange={handleChange}
            placeholder="Confirme sua senha"
          />
        </div>
        <div className="checkboxes-perfil">
          <label>
            <input
              type="checkbox"
              name="funcionario"
              checked={form.funcionario}
              onChange={(handleChange)}
            />
            Funcionário
          </label>
          <label>
            <input
              type="checkbox"
              name="gerente"
              checked={form.gerente}
              onChange={handleChange}
            />
            Gerente
          </label>
        </div>

        {form.funcionario && (
          <div className="area-funcionario">
            <h2>Horário de trabalho</h2>
            <div className="linha-horario-unico">
              <div className="grupo-hora">
                <span>Entrada</span>
                <input
                  className="input-hora"
                  type="time"
                  name="hora_entrada"
                  value={form.hora_entrada}
                  onChange={handleChange}
                />
              </div>
              <div className="grupo-hora">
                <span>Saída</span>
                <input
                  className="input-hora"
                  type="time"
                  name="hora_saida"
                  value={form.hora_saida}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grupo-servicos">
              <span>Serviços que o funcionário realiza</span>
              <MultiSelect
                options={servicos.map(servico => ({
                  value: servico.id,
                  label: servico.nome
                }))}
                value={servicosSelecionados}
                onChange={(valores) => setServicosSelecionados(valores)}
              />
            </div>
          </div>
        )}
        <button onClick={salvarUsuario} className='btn-salvar'>Salvar</button>
      </div>
    </div>
  )

}

export default Cadastro;