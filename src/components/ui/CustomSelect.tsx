import React from "react";

export type SelectOptionsType = {
  text: string;
  value: string;
};

type CustomSelectProps = {
  label: string;
  options: SelectOptionsType[];
  onSelected: (optionValue: string) => void;
};

export default function CustomSelect({
  label,
  options = [],
  onSelected,
}: CustomSelectProps) {
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelected(event.target.value);
  };

  return (
    <div className="custom-select">
      <label className="form-label">{label}</label>
      <select
        onChange={onChange}
        className="form-select"
        aria-label="Default select example"
        defaultValue="default"
      >
        <option hidden value="default">
          Колличество
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
}
