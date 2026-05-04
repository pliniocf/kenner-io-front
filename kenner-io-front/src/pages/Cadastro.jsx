/* Página com todos os atributos necessários para cadastro de usuário
Terá que ser dividida entre cadastro do gerente e cadastro normal de
usuário */
import Header from '../components/Header';
import DataTrabalho from '../components/DataTrabalho';
import MultiSelect from '../components/MultiSelect';

import './Cadastro.css'

function Cadastro() {
  return (
  <div>
    <Header></Header>
    <h1>Página de Cadastro</h1>
    <br/><input className="input" placeholder="Nome" />
    <br/><br/><input className="input" placeholder="CPF" />
    <br/><br/><input className="input" placeholder="Telefone" />
    <br/><br/><input className="input" placeholder="Email" />
    <br/><br/><input className="input" placeholder="Senha" />
    <br/><br/><input className="input" placeholder="Confirmação da Senha" />
    <br/><br/><input type="checkbox"/> Funcionário <input type="checkbox"/> Gerente
    
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
  </div>
  )

}

export default Cadastro;