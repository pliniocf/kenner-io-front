/* Página que vai ter os campos de login, senha e link para cadastro */
import { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import axios from 'axios';

import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from '../components/Header';
import './Agendamento.css'

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

function Agendamento() {

  const [form, setForm] = useState({
    servicos: [],
    profissionais: [],
    horariosDisponiveis: [],

    servicoSelecionado: "",
    profissionalSelecionado: "",

    dataSelecionada: null,

    horarioSelecionado: ""
  });

  useEffect(() => {
    getServicos();
  }, []);

  function atualizarCampo(campo, valor) {
    setForm((prev) => ({
      ...prev,
      [campo]: valor
    }));
  }

  async function getServicos() {
    try {
      const response = await axios.get(
        'http://localhost:3000/servicos'
      );

      atualizarCampo('servicos', response.data);

    } catch (err) {
      console.log(err);
    }
  }

  async function selecionarServico(servicoId) {

    atualizarCampo("servicoSelecionado", servicoId);
    atualizarCampo("profissionalSelecionado", "");
    atualizarCampo("horariosDisponiveis", []);
    atualizarCampo("dataSelecionada", null);
    atualizarCampo("horarioSelecionado", "");

    try {
      const response = await axios.get(
        `http://localhost:3000/servicos/${servicoId}/profissionais`
      );

      atualizarCampo("profissionais", response.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function selecionarData(data) {

    atualizarCampo("dataSelecionada", data);
    atualizarCampo("horariosDisponiveis", []);
    atualizarCampo("horarioSelecionado", "");

    try {
      const dataFormatada = data
        .toISOString()
        .split("T")[0];

      const response = await axios.get(
        `http://localhost:3000/agendamentos/disponibilidade?profissionalId=${form.profissionalSelecionado}&data=${dataFormatada}`
      );

      atualizarCampo("horariosDisponiveis", response.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function confirmarAgendamento() {
    try {
      const usuario = JSON.parse(
        localStorage.getItem("usuario")
      );

      const dataFormatada = form.dataSelecionada
        .toISOString().split("T")[0];

      await axios.post("http://localhost:3000/agendamentos", {
        cliente_id: usuario.id,
        servico_id: form.servicoSelecionado,
        profissional_id: form.profissionalSelecionado,
        data: dataFormatada,
        horario: form.horarioSelecionado
      });

      alert("Agendamento realizado");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <Header />
      <br />
      <h1>Nossos Serviços</h1>
      <div className="container">
        <select className="campo-agendamento"
          value={form.servicoSelecionado}
          onChange={(e) =>
            selecionarServico(e.target.value)
          }
        >
          <option value="">
            Selecione um serviço
          </option>
          {form.servicos.map((servico) => (
            <option key={servico.id} value={servico.id}>
              {servico.nome} - {formatMoeda(servico.valor)}
            </option>
          ))}
        </select>
        <br /><br />
        {form.profissionais.length > 0 && (
          <select className="campo-agendamento"
            value={form.profissionalSelecionado}
            onChange={(e) =>
              atualizarCampo("profissionalSelecionado", e.target.value)
            }
          >
            <option value="">
              Selecione um profissional
            </option>
            {form.profissionais.map((profissional) => (
              <option key={profissional.id} value={profissional.id}>
                {profissional.nome}
              </option>
            ))}
          </select>
        )}
        <br /><br />
        {form.profissionalSelecionado && (
          <DatePicker
            className="campo-agendamento"
            selected={form.dataSelecionada}
            onChange={selecionarData}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            placeholderText="Selecione uma data"
          />
        )}
        <br /><br />
        {form.horariosDisponiveis.length > 0 && (
          <div className='container-horarios'>
            <h3>Horários disponíveis</h3>
            {form.horariosDisponiveis.map((horario) => (
              <button
                key={horario}
                className={form.horarioSelecionado === horario
                  ? "btn-horario selecionado"
                  : "btn-horario"}
                onClick={() => atualizarCampo("horarioSelecionado", horario)}
              >
                {horario}
              </button>
            ))}
          </div>
        )}
        <br /><br />
        {form.horarioSelecionado && (
          <button onClick={confirmarAgendamento} className='button-header-landing'>
            Confirmar Agendamento
          </button>
        )}
      </div>
    </div>
  );
}

export default Agendamento;