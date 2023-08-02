import React, { FC } from "react";
import { useForm } from "react-hook-form";
import FormInput from "../FormInput/FormInput";

interface MembershipFormProps {
  onSubmit: (data: FormData) => void;
}

export type FormData = {
  firstname: string;
  lastname: string;
  email: string;
  amount: number;
  paymentMethod: string | null;
  willingToVolunteer: boolean;
};

const MembershipForm: FC<MembershipFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  const doSubmit = handleSubmit((data) => onSubmit(data));

  const amountValue = watch("amount");

  return (
    <form data-testid="MembershipForm" onSubmit={doSubmit}>
      <FormInput label="Prénom" name="firstname" error={errors.firstname}>
        <input
          {...register("firstname", { required: true })}
          id="firstname"
          type="text"
        />
      </FormInput>
      <FormInput label="Nom" name="lastname" error={errors.lastname}>
        <input
          {...register("lastname", { required: true })}
          id="lastname"
          type="text"
        />
      </FormInput>
      <FormInput label="Email" name="email" error={errors.email}>
        <input {...register("email")} type="email" id="email" />
      </FormInput>
      <div className="grid grid-cols-2 gap-4">
        <FormInput label="Montant" name="amount" error={errors.amount}>
          <input
            {...register("amount")}
            type="number"
            step={0.01}
            id="amount"
            min={0}
          />
        </FormInput>
        {amountValue && amountValue > 0 && (
          <FormInput
            label="Moyen de paiement"
            name="paymentMethod"
            error={errors.paymentMethod}
          >
            <div className="relative">
              <select {...register("paymentMethod")} id="paymentMethod">
                <option value="/payment_methods/1">CB</option>
                <option value="/payment_methods/2">Espèce</option>
                <option value="/payment_methods/3<">Stuck</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="h-4 w-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </FormInput>
        )}
      </div>
      <FormInput
        label="Souhaite devenir bénévole"
        name="willingToVolunteer"
        error={errors.willingToVolunteer}
      >
        <input
          {...register("willingToVolunteer")}
          type="checkbox"
          id="willingToVolunteer"
        />
      </FormInput>
      <button
        type="submit"
        className="mt-4 rounded bg-primary px-4 py-2 font-bold text-white hover:bg-opacity-75 active:outline active:outline-primary"
      >
        Envoyer
      </button>
    </form>
  );
};

export default MembershipForm;
