import React, { FC } from "react";
import { FaSpinner } from "react-icons/fa";

interface WaitingProps {
  size?: "lg";
  isInline?: boolean;
}

const Waiting: FC<WaitingProps> = ({ size, isInline = true }) => {
  const element = (
    <span data-testid="Waiting" className="animate-spin">
      <FaSpinner />
    </span>
  );

  if (isInline) {
    return element;
  }

  return (
    <div
      className={`flex ${
        size && size === "lg" ? "h-48 w-full" : ""
      } items-center justify-center`}
    >
      {element}
    </div>
  );
};

export default Waiting;
