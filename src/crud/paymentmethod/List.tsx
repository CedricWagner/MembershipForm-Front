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
import Line from "../../components/Table/Line/Line";
import Cell from "../../components/Table/Cell/Cell";

interface ListProps {
  retrieved: PagedCollection<TResource> | null;
  loading: boolean;
  error: TError;
}

const ListView = ({ error, loading, retrieved }: ListProps) => {
  const items = (retrieved && retrieved["hydra:member"]) || [];

  return (
    <Container>
      <PageTitle>Liste des moyens de paiement</PageTitle>

      {loading && <Waiting isInline={false} />}
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}

      <Table>
        <Head>
          <HeadCell>id</HeadCell>
          <HeadCell>Nom</HeadCell>
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
              <Cell>{item["name"]}</Cell>
              <Cell>
                <Link
                  to={`/paymentmethods/show/${encodeURIComponent(item["@id"])}`}
                >
                  <span className="fa fa-search" aria-hidden="true" />
                  <span className="sr-only">Show</span>
                </Link>
              </Cell>
              <Cell>
                <Link
                  to={`/paymentmethods/edit/${encodeURIComponent(item["@id"])}`}
                >
                  <span className="fa fa-pencil" aria-hidden="true" />
                  <span className="sr-only">Edit</span>
                </Link>
              </Cell>
            </Line>
          ))}
        </tbody>
      </Table>

      <Pagination retrieved={retrieved} root="/paymentmethods/" />
    </Container>
  );
};

const List = () => {
  const { page } = useParams<{ page?: string }>();
  const id = (page && decodeURIComponent(page)) || "payment_methods";

  const { retrieved, loading, error } =
    useRetrieve<PagedCollection<TResource>>(id);

  return <ListView retrieved={retrieved} loading={loading} error={error} />;
};

export default List;
