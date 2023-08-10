import React, { FC } from "react";
import { FaExclamationCircle } from "react-icons/fa";

interface FormErrorMessageProps {
  children: React.ReactNode;
}

const FormErrorMessage: FC<FormErrorMessageProps> = ({ children }) => (
  <div
    data-testid="FormErrorMessage"
    role="alert"
    className="flex flex-row items-center gap-2 text-red-500"
  >
    <FaExclamationCircle aria-hidden={true} title="Une erreur est survenue" />
    <div>{children}</div>
  </div>
);

export default FormErrorMessage;
