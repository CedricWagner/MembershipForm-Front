import { Link, Navigate, useParams } from "react-router-dom";
import Links from "../Links";
import { useRetrieve, useDelete } from "../../hooks";
import TResource from "./type";
import { TError } from "../../utils/types";
import Container from "../../components/Container/Container";
import PageTitle from "../../components/PageTitle/PageTitle";
import Waiting from "../../components/Waiting/Waiting";
import FormErrorMessage from "../../components/FormErrorMessage/FormErrorMessage";
import Table from "../../components/Table/Table";
import Head from "../../components/Table/Head/Head";
import HeadCell from "../../components/Table/HeadCell/HeadCell";
import Cell from "../../components/Table/Cell/Cell";
import {
  amountToDecimal,
  dateToFrFormat,
  timestampToDate,
} from "../../utils/transformers";

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
    return <Navigate to="/members/" replace />;
  }

  const delWiHeadCellConfirm = () => {
    if (
      item &&
      window.confirm(
        "Êtes vous certain·e de vouloir supprimer cette adhésion ?"
      )
    ) {
      del(item);
    }
  };

  return (
    <Container>
      <PageTitle>
        {item && item["firstname"] + " " + item["lastname"]} : Détail de
        l'adhésion
      </PageTitle>

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
            <tr>
              <HeadCell scope="row">Numéro</HeadCell>
              <Cell>{item["num"]}</Cell>
            </tr>
            <tr>
              <HeadCell scope="row">Prénom</HeadCell>
              <Cell>{item["firstname"]}</Cell>
            </tr>
            <tr>
              <HeadCell scope="row">Nom</HeadCell>
              <Cell>{item["lastname"]}</Cell>
            </tr>
            <tr>
              <HeadCell scope="row">Email</HeadCell>
              <Cell>{item["email"]}</Cell>
            </tr>
            <tr>
              <HeadCell scope="row">Montant</HeadCell>
              <Cell>{item["amount"] && amountToDecimal(item["amount"])}€</Cell>
            </tr>
            <tr>
              <HeadCell scope="row">Date</HeadCell>
              <Cell>{item["date"] && dateToFrFormat(item["date"])}</Cell>
            </tr>
            <tr>
              <HeadCell scope="row">Méthode de paiement</HeadCell>
              <Cell>
                <Links
                  items={{
                    href: `/payment_methods/show/${encodeURIComponent(
                      item["paymentMethod"] && item["paymentMethod"]["@id"]
                    )}`,
                    name:
                      item["paymentMethod"] && item["paymentMethod"]["name"],
                  }}
                />
              </Cell>
            </tr>
            <tr>
              <HeadCell scope="row">Souhaite devenir bénévole</HeadCell>
              <Cell>{item["willingToVolunteer"] ? "Oui" : "Non"}</Cell>
            </tr>
          </tbody>
        </Table>
      )}
      <Link to="/members/" className="btn btn-link">
        Retour à la liste
      </Link>
      {item && (
        <Link
          to={`/members/edit/${encodeURIComponent(item["@id"])}`}
          className="btn btn-primary"
        >
          <button>Modifier</button>
        </Link>
      )}
      <button onClick={delWiHeadCellConfirm} className="btn btn-danger">
        Supprimer
      </button>
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
