import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Field from "../Field";

import TResource from "./type";
import { SubmissionError, TError } from "../../utils/types";

interface FormProps {
  onSubmit: (item: Partial<TResource>) => any;
  initialValues?: Partial<TResource>;
  error?: TError;
  reset: () => void;
}

const Form = ({ onSubmit, error, reset, initialValues }: FormProps) => {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<TResource>({
    defaultValues: initialValues
      ? {
          ...initialValues,
        }
      : undefined,
  });

  useEffect(() => {
    if (error instanceof SubmissionError) {
      Object.keys(error.errors).forEach((errorPath) => {
        if (errors[errorPath as keyof TResource]) {
          return;
        }
        setError(errorPath as keyof TResource, {
          type: "server",
          message: error.errors[errorPath],
        });
      });

      reset();
    }
  }, [error, errors, reset, setError]);

  const onFormSubmit: SubmitHandler<TResource> = (data) => {
    onSubmit({
      ...data,
    });
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <Field
        register={register}
        name="num"
        placeholder=""
        type="number"
        errors={errors}
      />
      <Field
        register={register}
        name="firstname"
        placeholder=""
        type="text"
        required
        errors={errors}
      />
      <Field
        register={register}
        name="lastname"
        placeholder=""
        type="text"
        required
        errors={errors}
      />
      <Field
        register={register}
        name="email"
        placeholder=""
        type="text"
        errors={errors}
      />
      <Field
        register={register}
        name="amount"
        placeholder=""
        type="text"
        errors={errors}
      />
      <Field
        register={register}
        name="date"
        placeholder=""
        type="dateTime"
        errors={errors}
      />
      <Field
        register={register}
        name="paymentMethod"
        placeholder=""
        type="text"
        errors={errors}
      />
      <Field
        register={register}
        name="willingToVolunteer"
        placeholder=""
        type="checkbox"
        errors={errors}
      />

      <button type="submit" className="btn btn-success">
        Submit
      </button>
    </form>
  );
};

export default Form;
