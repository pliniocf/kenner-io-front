import './DataTrabalho.css'

function DataTrabalho({ dia }) {

  return ( 
    <div>
      <br/><input type="checkbox"/> {dia}
      <input className="input-hora" type="time" placeholder='Hora entrada'></input>
      <input className="input-hora" type="time" placeholder='Hora saída'></input>
      <input className="input-hora" type="time" placeholder='Hora entrada almoço'></input>
      <input className="input-hora" type="time" placeholder='Hora saída almoço'></input>
    </div>
  );
}

export default DataTrabalho;