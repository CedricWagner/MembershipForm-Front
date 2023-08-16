import { Link, Navigate } from "react-router-dom";
import { useCreate, useRetrieve } from "../../hooks";
import Form from "./Form";
import { TError } from "../../utils/types";
import TResource from "./type";
import Waiting from "../../components/Waiting/Waiting";
import FormErrorMessage from "../../components/FormErrorMessage/FormErrorMessage";
import PageTitle from "../../components/PageTitle/PageTitle";
import Container from "../../components/Container/Container";
import { PagedCollection } from "../../interfaces/Collection";
import { PaymentMethod } from "../../interfaces/PaymentMethod";

interface CreateProps {
  created: TResource | null;
  create: (item: Partial<TResource>) => any;
  error: TError;
  reset: () => void;
  loading: boolean;
}

const CreateView = ({
  create,
  created,
  error,
  reset,
  loading,
}: CreateProps) => {
  if (created) {
    return (
      <Navigate
        to={`/members/edit/${encodeURIComponent(created["@id"])}`}
        replace
      />
    );
  }

  // retrieve payment methods
  const {
    retrieved: paymentMethodsRetrieved,
    loading: paymentMethodsLoading,
    error: paymentMethodsError,
  } = useRetrieve<PagedCollection<PaymentMethod>>("payment_methods");
  const paymentMethods =
    (paymentMethodsRetrieved && paymentMethodsRetrieved["hydra:member"]) || [];

  return (
    <Container>
      <PageTitle>Nouvel adhérent</PageTitle>

      {loading && <Waiting isInline={false} />}
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}

      <Form
        onSubmit={create}
        error={error}
        reset={reset}
        initialValues={{
          date: new Date().toISOString().split("T")[0],
        }}
      />
      <Link to="/members/" className="btn btn-link">
        Retour à la liste
      </Link>
    </Container>
  );
};

const Create = () => {
  const { created, loading, error, reset, create } = useCreate<TResource>({
    "@id": "members",
  });

  return (
    <CreateView
      created={created}
      loading={loading}
      error={error}
      reset={reset}
      create={create}
    />
  );
};

export default Create;
