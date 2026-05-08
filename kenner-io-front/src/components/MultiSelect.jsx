import Select from "react-select";

function MultiSelect({ options, value, onChange }) {

  return (
    <div style={{ width: 300, padding: '20px 20px 200px 20px' }}>
      <Select
        options={options}
        value={value}
        onChange={onChange}
        isMulti
        placeholder="Selecione opções..."
      />
    </div>
  );
}

export default MultiSelect;