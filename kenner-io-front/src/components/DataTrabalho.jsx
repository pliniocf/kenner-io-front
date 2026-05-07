import './DataTrabalho.css'

function DataTrabalho({ dia }) {

  return ( 
    <div className="linha-trabalho">
      <label className="dia-trabalho">
        <input type="checkbox" />{dia}
      </label>

      <div className="horarios-trabalho">
        <div className="grupo-hora">
          <span>Entrada</span>
          <input className="input-hora" type="time"/>
        </div>

        <div className="grupo-hora">
          <span>Saída</span>
          <input className="input-hora" type="time"/>
        </div>
      </div>
    </div>
  );
}

export default DataTrabalho;