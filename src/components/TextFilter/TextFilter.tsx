import React, { FC } from 'react';

interface TextFilterProps {  
  onFilter: (text: string) => void;
  // currentValue: string;
}

let label = "Recherche textuelle";

const TextFilter: FC<TextFilterProps> = ({ onFilter }) => (
  <div data-testid="TextFilter">
    <form action="">
      <label
        className="mb-2 block text-sm font-bold text-gray-700"
        htmlFor={`text-filter-${label.toLowerCase()}`}
      >
        {label}
      </label>
      <input
        id={`text-filter-${label.toLowerCase()}`}
        placeholder={"pierre.kropotkine@example.com"}
        // value={currentValue}
        type="text"
        onChange={(e) => onFilter(e.target.value)}
      />
    </form>
  </div>
);

export default TextFilter;
