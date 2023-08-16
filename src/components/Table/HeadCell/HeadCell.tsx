import React, { FC } from "react";

interface HeadCellProps {
  children: React.ReactNode;
  scope?: string;
}

const HeadCell: FC<HeadCellProps> = ({ children, scope }) => (
  <th data-testid="HeadCell" className="p-2" scope={scope}>
    {children}
  </th>
);

export default HeadCell;
