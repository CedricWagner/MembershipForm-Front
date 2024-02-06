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
  autocomplete?: boolean;
  options?: {
    value: string;
    label?: string;
    selected?: boolean;
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
  autocomplete = false,
}: FieldProps<TFieldValues>) => {
  const inputProps: { className: string; "aria-invalid"?: boolean } = {
    className: "",
  };

  let labelClassName: string = "mb-2 text-sm font-bold text-gray-700";

  interface ValidationProps {
    [key: string]: any;
  }
  const validations: ValidationProps = {
    valueAsNumber: type === "number",
  };

  if (required) {
    validations.required = "Ce champ est requis";
  }

  if (errors[name]) {
    inputProps["aria-invalid"] = true;
  }

  if (!errors[name]) {
    inputProps.className += " is-valid";
  }

  if (type === "checkbox") {
    labelClassName += " mr-2";
  } else {
    labelClassName += " block";
  }

  return (
    <div className={errors[name] ? "my-2 border border-red-500 p-2" : ""}>
      <label className={labelClassName} htmlFor={name}>
        {label ? label : name}
      </label>
      {type === "select" ? (
        <select
          id={name}
          placeholder={placeholder}
          {...inputProps}
          {...register(name, validations)}
        >
          {options?.map(({ value, label, selected }) => (
            <option key={value} value={value} selected={selected}>
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
          autoComplete={autocomplete ? "on" : "off"}
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
