import { FC, FormEvent } from 'react';

interface TextFilterProps {  
  onFilter: (text: string) => void;
}

let label = "Recherche textuelle";

const TextFilter: FC<TextFilterProps> = ({ onFilter }) => (
  <div data-testid="TextFilter">
    <form action="" onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}>
      <label
        className="mb-2 block text-sm font-bold text-gray-700"
        htmlFor={`text-filter-${label.toLowerCase()}`}
      >
        {label}
      </label>
      <input
        id={`text-filter-${label.toLowerCase()}`}
        placeholder={"pierre.kropotkine@example.com"}
        type="text"
        onChange={(e) => onFilter(e.target.value)}
      />
    </form>
  </div>
);

export default TextFilter;
