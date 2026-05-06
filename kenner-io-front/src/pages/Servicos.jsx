/* Página que vai ter os campos de login, senha e link para cadastro */
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from 'react';

import Header from '../components/Header';
import './Servicos.css'

function Servicos() {

  let servicos = [
    {nome: 'Luzes', duracao: '2h', valor: 250},
    {nome: 'Unhas', duracao: '30min', valor: 40},
    {nome: 'Cabelo', duracao: '40min', valor: 50},
  ]

  let [novoServico, setNovoServico] = useState({nome: '', duracao: '', valor: 0})

  return (
    <div>
      <Header></Header>
      <br/><h1>Nosso Serviços</h1>
      <div className="container">
        {servicos.map((servico, index) => (
          <div className="row" key={index}>
            <div className="col-4">{servico.nome}</div>
            <div className="col-4">{servico.duracao}</div>
            <div className="col-4">R$ {servico.valor}</div>
          </div>
        ))}
      </div>
      {/* <br/><h1>Cadastrar Novo Serviço</h1>
      <div className="container">
        <div className="row">
          <input className="input col-3" value={novoServico.nome} onChange={(e) =>
            setNovoServico({ ...novoServico, nome: e.target.value })
          } placeholder='Descrição'></input>
          <input className="input col-3" placeholder='Tempo de Duração'></input>
          <input className="input col-3" placeholder='Valor'></input>
          <button onClick={() => servicos.push({})} className='button-cadastro col-3'>
            Salvar
          </button>
        </div>
      </div> */}
    </div>
  )

}

export default Servicos;