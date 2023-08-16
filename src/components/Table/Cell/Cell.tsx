import React, { FC } from "react";

interface CellProps {
  children: React.ReactNode;
}

const Cell: FC<CellProps> = ({ children }) => (
  <td data-testid="Cell" className="p-2">
    {children}
  </td>
);

export default Cell;
