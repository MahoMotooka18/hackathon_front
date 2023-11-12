import  { FC, ChangeEvent } from 'react';

interface CheckboxProps {
  name: string;
  value: Array<string>;
  selectedValues: Array<string>;
  onChange: (selected: Array<string>) => void;
}

const CheckboxContainer: FC<CheckboxProps> = ({ name, value, selectedValues, onChange }) => {
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;
    const updatedSelectedValues = selectedValues.includes(selectedValue)
      ? selectedValues.filter(value => value !== selectedValue)
      : [...selectedValues, selectedValue];
    onChange(updatedSelectedValues);
  };

  return (
    <>
      {value.map((item, index) => (
        <label key={index}>
          <input
            type="checkbox"
            name={name}
            value={item}
            checked={selectedValues.includes(item)}
            onChange={handleCheckboxChange}
          />
          {item}
        </label>
      ))}
    </>
  );
};

export default CheckboxContainer;