import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Field from "../Field";

import TResource from "./type";
import { SubmissionError, TError } from "../../utils/types";
import { amountToString } from "../../utils/transformers";

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
  console.log(initialValues);

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
    data.amount = amountToString(data.amount);
    if (data.amount === "0") {
      delete data.paymentMethod;
    }

    onSubmit({
      ...data,
    });
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <Field
        register={register}
        name="date"
        label="Date"
        placeholder=""
        type="date"
        required
        errors={errors}
      />
      <Field
        register={register}
        name="lastname"
        label="Nom"
        placeholder=""
        type="text"
        required
        errors={errors}
      />
      <Field
        register={register}
        name="firstname"
        label="Prénom"
        placeholder=""
        type="text"
        required
        errors={errors}
      />
      <Field
        register={register}
        name="email"
        label="Email"
        placeholder=""
        type="text"
        errors={errors}
      />
      <Field
        register={register}
        name="amount"
        label="Montant"
        placeholder=""
        type="number"
        step="0.01"
        errors={errors}
      />
      <Field
        register={register}
        name="paymentMethod"
        label="Moyen de paiement"
        placeholder=""
        type="text"
        errors={errors}
      />
      <Field
        register={register}
        name="willingToVolunteer"
        label="Souhaite devenir bénévole"
        placeholder=""
        type="checkbox"
        errors={errors}
      />

      <button type="submit" className="btn btn-primary">
        Envoyer
      </button>
    </form>
  );
};

export default Form;
