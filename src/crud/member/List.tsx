import { Link, useParams } from "react-router-dom";
import Links from "../Links";
import Pagination from "../Pagination";
import { useRetrieve } from "../../hooks";
import { PagedCollection } from "../../interfaces/Collection";
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
import Line from "../../components/Table/Line/Line";

interface ListProps {
  retrieved: PagedCollection<TResource> | null;
  loading: boolean;
  error: TError;
}

const ListView = ({ error, loading, retrieved }: ListProps) => {
  const items = (retrieved && retrieved["hydra:member"]) || [];

  return (
    <Container>
      <PageTitle>Liste des adhésions</PageTitle>

      {loading && <Waiting isInline={false} />}
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}

      <p>
        <Link to="create" className="btn btn-primary">
          Nouveau
        </Link>
      </p>

      <Table>
        <Head>
          <HeadCell>id</HeadCell>
          <HeadCell>Numéro</HeadCell>
          <HeadCell>Prénom</HeadCell>
          <HeadCell>Nom</HeadCell>
          <HeadCell>Email</HeadCell>
          <HeadCell>Montant</HeadCell>
          <HeadCell>Date</HeadCell>
          <HeadCell>Méthode de paiement</HeadCell>
          <HeadCell>Souhaite devenir bénévole ?</HeadCell>
          <th colSpan={2} />
        </Head>
        <tbody>
          {items.map((item) => (
            <Line key={item["@id"]}>
              <HeadCell scope="row">
                <Links
                  items={{
                    href: `show/${encodeURIComponent(item["@id"])}`,
                    name: item["@id"],
                  }}
                />
              </HeadCell>
              <Cell>{item["num"]}</Cell>
              <Cell>{item["firstname"]}</Cell>
              <Cell>{item["lastname"]}</Cell>
              <Cell>{item["email"]}</Cell>
              <Cell>{item["amount"]}</Cell>
              <Cell>{item["date"]}</Cell>
              <Cell>
                <Links
                  items={{
                    href: `/payment_methods/show/${encodeURIComponent(
                      item["paymentMethod"]
                    )}`,
                    name: item["paymentMethod"],
                  }}
                />
              </Cell>
              <Cell>{item["willingToVolunteer"] ? "Oui" : "Non"}</Cell>
              <Cell>
                <Link to={`/members/show/${encodeURIComponent(item["@id"])}`}>
                  <span className="fa fa-search" aria-hidden="true" />
                  <span className="sr-only">Voir</span>
                </Link>
              </Cell>
              <Cell>
                <Link to={`/members/edit/${encodeURIComponent(item["@id"])}`}>
                  <span className="fa fa-pencil" aria-hidden="true" />
                  <span className="sr-only">Modifier</span>
                </Link>
              </Cell>
            </Line>
          ))}
        </tbody>
      </Table>

      <Pagination retrieved={retrieved} />
    </Container>
  );
};

const List = () => {
  const { page } = useParams<{ page?: string }>();
  const id = (page && decodeURIComponent(page)) || "members";

  const { retrieved, loading, error } =
    useRetrieve<PagedCollection<TResource>>(id);

  return <ListView retrieved={retrieved} loading={loading} error={error} />;
};

export default List;
