import {
  DeepMap,
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import FormErrorMessage from "../components/FormErrorMessage/FormErrorMessage";

interface FieldProps<TFieldValues extends FieldValues> {
  register: UseFormRegister<TFieldValues>;
  name: Path<TFieldValues>;
  label?: string;
  placeholder: string;
  type: string;
  step?: string;
  min?: string;
  required?: boolean;
  errors: Partial<DeepMap<TFieldValues, FieldError>>;
  options?: {
    value: string;
    label?: string;
  }[];
}

const Field = <TFieldValues extends FieldValues>({
  register,
  name,
  label,
  placeholder,
  type,
  step,
  min,
  required = false,
  errors,
  options,
}: FieldProps<TFieldValues>) => {
  const inputProps: { className: string; "aria-invalid"?: boolean } = {
    className: "",
  };

  interface ValidationProps {
    [key: string]: any;
  }
  let validations: ValidationProps = {
    valueAsNumber: type === "number",
  };

  if (required) {
    validations.required = "Ce champ est requis";
  }

  if (errors[name]) {
    inputProps.className += "";
    inputProps["aria-invalid"] = true;
  }

  if (!errors[name]) {
    inputProps.className += " is-valid";
  }

  return (
    <div className={errors[name] ? "my-2 border border-red-500 p-2" : ""}>
      <label
        className="mb-2 block text-sm font-bold text-gray-700"
        htmlFor={name}
      >
        {label ? label : name}
      </label>
      {type === "select" ? (
        <select
          id={name}
          placeholder={placeholder}
          {...inputProps}
          {...register(name, validations)}
        >
          {options?.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          placeholder={placeholder}
          type={type}
          step={step}
          min={min}
          {...inputProps}
          {...register(name, validations)}
        />
      )}
      {errors[name] && (
        <FormErrorMessage>{errors[name]?.message}</FormErrorMessage>
      )}
    </div>
  );
};

export default Field;
