import { Link, useNavigate, useParams } from "react-router-dom";
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
import {
  amountToDecimal,
  dateToFrFormat,
  getFormattedMemberNum,
  timestampToDate,
} from "../../utils/transformers";
import DateRangeFilter from "../../components/DateRangeFilter/DateRangeFilter";
import { PaymentMethod } from "../../interfaces/PaymentMethod";

interface ListProps {
  retrieved: PagedCollection<TResource> | null;
  loading: boolean;
  error: TError;
}

const ListView = ({ error, loading, retrieved }: ListProps) => {
  const items = (retrieved && retrieved["hydra:member"]) || [];
  const totalItems = (retrieved && retrieved["hydra:totalItems"]) || 0;
  const navigate = useNavigate();

  function onFilterDateRange(start: string, end: string) {
    navigate(
      "/members/" +
        encodeURIComponent(
          `/api/members/?date[after]=${start}&date[before]=${end}`
        )
    );
  }

  return (
    <Container>
      <div className="flex flex-wrap justify-between">
        <PageTitle>Liste des adhésions</PageTitle>
        <div>
          <DateRangeFilter onFilter={onFilterDateRange} />
        </div>
      </div>

      {loading && <Waiting isInline={false} />}
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}

      <p>
        <Link to="/members/create" className="btn btn-primary">
          Nouveau
        </Link>
      </p>
      {items.length === 0 && (
        <p className="italic">Aucun résultat pour les dates sélectionnées</p>
      )}

      {items.length > 0 && (
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
            <HeadCell>Newsletter ?</HeadCell>
            <HeadCell>Bénévole ?</HeadCell>
            <th colSpan={2} />
          </Head>
          <tbody>
            {items.map((item) => (
              <Line key={item["@id"]}>
                <HeadCell scope="row">
                  <Links
                    items={{
                      href: `/members/show/${encodeURIComponent(item["@id"])}`,
                      name: item["@id"],
                    }}
                  />
                </HeadCell>
                <Cell>
                  {item["num"] && getFormattedMemberNum(item["num"].toString())}
                </Cell>
                <Cell>{item["firstname"]}</Cell>
                <Cell>{item["lastname"]}</Cell>
                <Cell>{item["email"]}</Cell>
                <Cell>
                  {item["amount"] && amountToDecimal(item["amount"])}€
                </Cell>
                <Cell>{item["date"] && dateToFrFormat(item["date"])}</Cell>
                <Cell>
                  <Links
                    items={{
                      href: `/payment_methods/show/${encodeURIComponent(
                        (item.paymentMethod &&
                          (item.paymentMethod as PaymentMethod)["@id"]) ??
                          ""
                      )}`,
                      name:
                        (item.paymentMethod &&
                          (item.paymentMethod as PaymentMethod).name) ??
                        "",
                    }}
                  />
                </Cell>
                <Cell>{item["subscribedToNewsletter"] ? "Oui" : "Non"}</Cell>
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
      )}

      {items.length < totalItems && (
        <Pagination retrieved={retrieved} root="/members/" />
      )}
    </Container>
  );
};

const List = () => {
  const { page } = useParams<{ page?: string }>();
  const dateNow = timestampToDate(new Date().toISOString());
  const id =
    (page && decodeURIComponent(page)) ||
    `/api/members/?date[after]=${dateNow}&date[before]=${dateNow}`;

  const { retrieved, loading, error } =
    useRetrieve<PagedCollection<TResource>>(id);

  return <ListView retrieved={retrieved} loading={loading} error={error} />;
};

export default List;
