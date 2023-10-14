import React, { FC } from "react";
import TResource from "../../crud/member/type";
import { useRetrieve } from "../../hooks";
import { PagedCollection } from "../../interfaces/Collection";
import { makeCsv } from "../../utils/makeCSV";
import { TError } from "../../utils/types";
import FormErrorMessage from "../FormErrorMessage/FormErrorMessage";
import Waiting from "../Waiting/Waiting";
import { dateToFrFormat } from "../../utils/transformers";
import { PaymentMethod } from "../../interfaces/PaymentMethod";

interface ViewProps {
  retrieved: PagedCollection<TResource> | null;
  loading: boolean;
  error: TError;
  children: React.ReactNode;
  dateStart: string;
  dateEnd: string;
}

const ExportButtonView: FC<ViewProps> = ({
  retrieved,
  loading,
  error,
  children,
  dateStart,
  dateEnd,
}) => {
  const items = (retrieved && retrieved["hydra:member"]) || [];

  const exportName: string = `export-adhesions-du-${dateToFrFormat(
    dateStart
  )}-au-${dateToFrFormat(dateEnd)}.csv`;
  return (
    <div data-testid="ExportButton">
      {loading && <Waiting isInline={true} />}
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      {items.length > 0 && (
        <button
          className="btn btn-primary col-auto ml-4 flex min-h-[150px] w-[250px] flex-col items-center justify-center"
          onClick={() =>
            makeCsv(
              [
                // Header
                {
                  num: "Numéro",
                  date: "Date d'adhesion",
                  lastname: "Nom",
                  firstname: "Prénom",
                  email: "Email",
                  amount: "Montant",
                  paymentMethod: "Méthode de paiement",
                  willingToVolunteer: "Souhaite devenir bénévole ?",
                },
              ].concat(
                // Members
                items.map((item) => {
                  return {
                    num: item.num?.toString() ?? "",
                    date: item.date ? dateToFrFormat(item.date) : "",
                    lastname: item.lastname ?? "",
                    firstname: item.firstname ?? "",
                    email: item.email ?? "",
                    amount: item.amount ?? "",
                    paymentMethod: item.paymentMethod
                      ? (item.paymentMethod as PaymentMethod).name ?? ""
                      : "",
                    willingToVolunteer: item.willingToVolunteer ? "Oui" : "Non",
                  };
                })
              ),
              exportName
            )
          }
        >
          {children}
        </button>
      )}
    </div>
  );
};

interface ExportButtonProps {
  children: React.ReactNode;
  dateStart: string;
  dateEnd: string;
}

const ExportButton: FC<ExportButtonProps> = ({
  children,
  dateStart,
  dateEnd,
}) => {
  const id = `/api/members/?date[after]=${dateStart}&date[before]=${dateEnd}`;

  const { retrieved, loading, error } =
    useRetrieve<PagedCollection<TResource>>(id);

  return (
    <ExportButtonView
      retrieved={retrieved}
      loading={loading}
      error={error}
      dateStart={dateStart}
      dateEnd={dateEnd}
    >
      {children}
    </ExportButtonView>
  );
};

export default ExportButton;
