import React, { FC } from "react";
import { FaCheck } from "react-icons/fa";

interface SuccessMessageProps {
  children: React.ReactNode;
}

const SuccessMessage: FC<SuccessMessageProps> = ({ children }) => (
  <div
    data-testid="SuccessMessage"
    role="status"
    className="flex flex-row items-center gap-2 text-green-500"
  >
    <FaCheck aria-hidden={true} title="Une erreur est survenue" />
    <div>{children}</div>
  </div>
);

export default SuccessMessage;
