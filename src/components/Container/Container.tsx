import React, { FC } from "react";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: FC<ContainerProps> = ({ children }) => (
  <div data-testid="Container" className="container mx-auto p-4">
    {children}
  </div>
);

export default Container;
