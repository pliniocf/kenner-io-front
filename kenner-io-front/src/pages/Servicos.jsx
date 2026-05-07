/* Página que vai ter os campos de login, senha e link para cadastro */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import axios from 'axios';

import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from '../components/Header';
import './Servicos.css'

function getTempo(tempo) {
  const data = new Date(tempo);
  const horas = data.getUTCHours();
  const minutos = data.getUTCMinutes();

  return `${horas}h ${minutos}min`;
}

function formatMoeda(valor) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor);
}

function Servicos() {

  const [servicos, setServicos] = useState([]);
  const [dataSelecionada, setDataSelecionada] = useState(null);
  const [mostrarCalendario, setMostrarCalendario] = useState(false);

  const navigate = useNavigate();
  //const [novoServico, setNovoServico] = useState({nome: '', duracao: '', valor: 0})

  useEffect(() => {
    getServicos();
  }, []);

  async function getServicos() {
    try {
      const response = await axios.get(
        'http://localhost:3000/servicos'
      );

      setServicos(response.data);

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <Header></Header>
      <br/><h1>Nosso Serviços</h1>
      <div className="container">
        <table className="tabela-servicos">
          <thead>
            <tr>
              <th>Serviço</th>
              <th>Duração</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {servicos.map((servico) => (
              <tr key={servico.id}>
                <td>{servico.nome}</td>
                <td>{getTempo(servico.tempo)}</td>
                <td>{formatMoeda(servico.valor)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br/><br/><button onClick={() => navigate('/agendamentos')} className='button-header-landing'>
        Reserve seu horário
      </button>
    </div>
  )

}

export default Servicos;