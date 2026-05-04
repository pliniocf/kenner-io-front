import Select from "react-select";

const options = [
  { value: "cabelo", label: "Cabelo" },
  { value: "barba", label: "Barba" },
  { value: "luzes", label: "Luzes" },
  { value: "pintura", label: "Pintura" },
  { value: "unhas", label: "Unhas" },
];

function MultiSelect() {
  return (
    <div style={{ width: 300, padding: '20px 20px 200px 20px' }}>
      <Select
        options={options}
        isMulti
        placeholder="Selecione opções..."
      />
    </div>
  );
}

export default MultiSelect;