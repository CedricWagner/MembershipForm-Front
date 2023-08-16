import { Link, Navigate, useParams } from "react-router-dom";

import { useRetrieve, useDelete } from "../../hooks";
import TResource from "./type";
import { TError } from "../../utils/types";
import Container from "../../components/Container/Container";
import PageTitle from "../../components/PageTitle/PageTitle";
import Waiting from "../../components/Waiting/Waiting";
import FormErrorMessage from "../../components/FormErrorMessage/FormErrorMessage";
import Table from "../../components/Table/Table";
import Head from "../../components/Table/Head/Head";
import Line from "../../components/Table/Line/Line";
import Cell from "../../components/Table/Cell/Cell";
import HeadCell from "../../components/Table/HeadCell/HeadCell";

interface ShowProps {
  retrieved: TResource | null;
  loading: boolean;
  error: TError;
  deleteError: TError;
  deleted: TResource | null;
  del: (item: TResource) => any;
}

const ShowView = ({
  del,
  deleteError,
  deleted,
  error,
  loading,
  retrieved: item,
}: ShowProps) => {
  if (deleted) {
    return <Navigate to="/paymentmethods/" replace />;
  }

  const delWithConfirm = () => {
    if (item && window.confirm("Are you sure you want to delete this item?")) {
      del(item);
    }
  };

  return (
    <Container>
      <PageTitle>Moyen de paiement {item && item["name"]}</PageTitle>

      {loading && <Waiting isInline={false} />}
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      {deleteError && (
        <FormErrorMessage>{deleteError.message}</FormErrorMessage>
      )}

      {item && (
        <Table>
          <Head>
            <HeadCell>Champ</HeadCell>
            <HeadCell>Valeur</HeadCell>
          </Head>
          <tbody>
            <Line>
              <HeadCell scope="row">Nom</HeadCell>
              <Cell>{item["name"]}</Cell>
            </Line>
          </tbody>
        </Table>
      )}
      <Link to="/payment_methods/" className="btn btn-link">
        Retour à la liste
      </Link>
      {item && (
        <Link to={`/payment_methods/edit/${encodeURIComponent(item["@id"])}`}>
          <button className="btn btn-primary">Modifier</button>
        </Link>
      )}
    </Container>
  );
};

const Show = () => {
  const { id } = useParams<{ id: string }>();
  const { retrieved, loading, error } = useRetrieve<TResource>(
    decodeURIComponent(id || "")
  );
  const { deleted, error: deleteError, del } = useDelete<TResource>();

  return (
    <ShowView
      retrieved={retrieved}
      loading={loading}
      error={error}
      deleteError={deleteError}
      deleted={deleted}
      del={del}
    />
  );
};

export default Show;
