import React, { FC } from "react";

interface LineProps {
  children: React.ReactNode;
}

const Line: FC<LineProps> = ({ children }) => (
  <tr data-testid="Line" className="border-gray-400 hover:border-b">
    {children}
  </tr>
);

export default Line;
