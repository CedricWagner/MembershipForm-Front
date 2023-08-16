import React, { FC } from "react";

interface HeadProps {
  children: React.ReactNode;
}

const Head: FC<HeadProps> = ({ children }) => (
  <thead data-testid="Head" className="border-b border-gray-400 uppercase">
    <tr>{children}</tr>
  </thead>
);

export default Head;
