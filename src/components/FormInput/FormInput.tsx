import React, { FC } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface FormInputProps {
  label: string;
  name: string;
  children: React.ReactNode;
  error?: FieldError;
}

const FormInput: FC<FormInputProps> = ({ label, name, children, error }) => {
  let errorText: string;
  switch (error?.type) {
    case "required":
      errorText = "Ce champ est requis";
      break;
    default:
      errorText = "Ce champ comporte une erreur";
  }

  return (
    <div
      data-testid="FormInput"
      className={error ? "my-2 border border-red-500 p-2" : ""}
    >
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-bold text-gray-700"
      >
        {label}
      </label>
      {children}
      {error && (
        <div role="alert" className="text-red-500">
          {errorText}
        </div>
      )}
    </div>
  );
};

export default FormInput;
