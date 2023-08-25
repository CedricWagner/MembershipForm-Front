import React, { ChangeEvent, FC } from "react";

interface DateRangeFilterItemProps {
  onSelect: (value: string) => void;
  currentValue: string;
  label: string;
  min?: string;
  max?: string;
}

const DateRangeFilterItem: FC<DateRangeFilterItemProps> = ({
  onSelect,
  currentValue,
  label,
  min,
  max,
}) => {
  function handleChange(event: React.FormEvent<HTMLInputElement>) {
    onSelect(event.currentTarget.value);
  }
  return (
    <div data-testid="DateRangeFilterItem">
      <label
        className="mb-2 block text-sm font-bold text-gray-700"
        htmlFor={`date-range-filter-${label.toLowerCase()}`}
      >
        {label}
      </label>
      <input
        id={`date-range-filter-${label.toLowerCase()}`}
        placeholder={"jj/mm/aaaa"}
        value={currentValue}
        type="date"
        min={min}
        max={max}
        onChange={handleChange}
      />
    </div>
  );
};

export default DateRangeFilterItem;
