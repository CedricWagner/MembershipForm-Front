import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Field from "../Field";

import TResource from "./type";
import PaymentMethodRessource from "../paymentmethod/type";
import { SubmissionError, TError } from "../../utils/types";
import {
  amountToDecimal,
  amountToString,
  timestampToDate,
} from "../../utils/transformers";
import { useRetrieve } from "../../hooks";
import { PagedCollection } from "../../interfaces/Collection";
import { PaymentMethod } from "../../interfaces/PaymentMethod";

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
    watch,
    formState: { errors },
    getValues,
  } = useForm<TResource>({
    defaultValues: initialValues
      ? {
          ...initialValues,
          date: initialValues.date && timestampToDate(initialValues.date),
          paymentMethod:
            (initialValues.paymentMethod as PaymentMethod)?.["@id"] ?? "",
        }
      : undefined,
  });

  // retrieve payment methods
  const {
    retrieved: paymentMethodsRetrieved,
    loading: paymentMethodsLoading,
    error: paymentMethodsError,
  } = useRetrieve<PagedCollection<PaymentMethodRessource>>("payment_methods");
  const paymentMethods =
    (paymentMethodsRetrieved && paymentMethodsRetrieved["hydra:member"]) || [];

  const amountValue = watch("amount");

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
    <form onSubmit={handleSubmit(onFormSubmit)} data-testid="MemberForm">
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
        required
        errors={errors}
      />
      <div className="grid grid-cols-2 gap-4">
        <Field
          register={register}
          name="amount"
          label="Montant"
          placeholder=""
          type="number"
          step="0.01"
          min="0"
          errors={errors}
        />
        {!!amountValue && amountToDecimal(amountValue) > 0 && (
          <Field
            register={register}
            name="paymentMethod"
            label="Moyen de paiement"
            placeholder=""
            type="select"
            errors={errors}
            options={
              !paymentMethodsLoading && !paymentMethodsError
                ? paymentMethods.map((pm) => {
                    return {
                      value: pm["@id"],
                      label: pm.name,
                      selected: getValues("paymentMethod") === pm["@id"],
                    };
                  })
                : []
            }
          />
        )}
      </div>
      <Field
        register={register}
        name="subscribedToNewsletter"
        label="S'inscrire à la newsletter"
        placeholder=""
        type="checkbox"
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
