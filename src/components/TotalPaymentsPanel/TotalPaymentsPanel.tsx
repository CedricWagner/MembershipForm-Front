import React, { FC } from "react";
import { useRetrieve } from "../../hooks";
import { TotalPayments } from "../../interfaces/TotalPayments";
import { dateToFrFormat } from "../../utils/transformers";
import FormErrorMessage from "../FormErrorMessage/FormErrorMessage";
import Waiting from "../Waiting/Waiting";

interface TotalPaymentsPanelProps {
  dateStart: string;
  dateEnd: string;
}

const TotalPaymentsPanel: FC<TotalPaymentsPanelProps> = ({
  dateStart,
  dateEnd,
}) => {
  const {
    retrieved: totalPayments,
    loading,
    error,
  } = useRetrieve<TotalPayments>(
    `/api/total_payments?dateStart=${dateStart}&dateEnd=${dateEnd}`
  );

  return (
    <div data-testid="TotalPaymentsPanel" className="rounded bg-gray-200 p-4">
      {loading && <Waiting isInline={false} />}
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}

      <p>
        Total adhésions : <b>{totalPayments?.total}€</b>
      </p>
      <span className="text-sm">
        (pour la période du {dateToFrFormat(dateStart)} au&nbsp;
        {dateToFrFormat(dateEnd)})
      </span>
    </div>
  );
};

export default TotalPaymentsPanel;
