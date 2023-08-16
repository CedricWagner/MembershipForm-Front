import React, { FC } from "react";

interface TableProps {
  children: React.ReactNode;
}

const Table: FC<TableProps> = ({ children }) => (
  <table
    data-testid="Table"
    className="mt-5 w-full overflow-hidden rounded-lg bg-slate-100 text-left"
  >
    {children}
  </table>
);

export default Table;
