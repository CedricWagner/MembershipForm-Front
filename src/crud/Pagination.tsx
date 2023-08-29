import { Link } from "react-router-dom";
import { PagedCollection } from "../interfaces/Collection";

interface PaginationProps {
  retrieved: PagedCollection<any> | null;
  root: string;
}

const Pagination = ({ retrieved, root }: PaginationProps) => {
  const view = retrieved && retrieved["hydra:view"];
  if (!view) {
    return null;
  }

  const pathWithRoot = (path: string) => {
    return root + path;
  };

  const {
    "hydra:first": first,
    "hydra:previous": previous,
    "hydra:next": next,
    "hydra:last": last,
  } = view;

  return (
    <nav aria-label="Page navigation">
      <Link
        to={pathWithRoot(!first ? "." : encodeURIComponent(first))}
        className={`btn btn-link${previous ? "" : " btn-disabled"}`}
        aria-label="Début"
      >
        <span aria-hidden="true">&lArr;</span> Début
      </Link>
      <Link
        to={pathWithRoot(!previous ? "." : encodeURIComponent(previous))}
        className={`btn btn-link${previous ? "" : " btn-disabled"}`}
        aria-label="Page précédente"
      >
        <span aria-hidden="true">&larr;</span> Page précédente
      </Link>
      <Link
        to={pathWithRoot(!next ? "." : encodeURIComponent(next))}
        className={`btn btn-link${next ? "" : " btn-disabled"}`}
        aria-label="Page suivante"
      >
        Page suivante <span aria-hidden="true">&rarr;</span>
      </Link>
      <Link
        to={pathWithRoot(!last ? "." : encodeURIComponent(last))}
        className={`btn btn-link${next ? "" : " btn-disabled"}`}
        aria-label="Fin"
      >
        Fin <span aria-hidden="true">&rArr;</span>
      </Link>
    </nav>
  );
};

export default Pagination;
