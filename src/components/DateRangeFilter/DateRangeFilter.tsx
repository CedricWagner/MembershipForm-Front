import React, { FC, useEffect, useState } from "react";
import { timestampToDate } from "../../utils/transformers";
import DateRangeFilterItem from "./DateRangeFilterItem";

interface DateRangeFilterProps {
  onFilter: (start: string, end: string) => void;
}

const DateRangeFilter: FC<DateRangeFilterProps> = ({ onFilter }) => {
  const dateNow = timestampToDate(new Date().toISOString());
  const [dateStart, setDateStart] = useState(dateNow);
  const [dateEnd, setDateEnd] = useState(dateNow);

  useEffect(() => {
    onFilter(dateStart, dateEnd);
  }, [dateStart, dateEnd]);

  return (
    <form className="form flex items-end gap-4" data-testid="DateRangeFilter">
      <DateRangeFilterItem
        onSelect={setDateStart}
        label="du"
        currentValue={dateStart}
        max={dateEnd}
      />
      <DateRangeFilterItem
        onSelect={setDateEnd}
        label="au"
        currentValue={dateEnd}
        min={dateStart}
        max={dateNow}
      />
    </form>
  );
};

export default DateRangeFilter;
