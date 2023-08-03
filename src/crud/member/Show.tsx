import { Link, Navigate, useParams } from "react-router-dom";
import Links from "../Links";
import { useRetrieve, useDelete } from "../../hooks";
import TResource from "./type";
import { TError } from "../../utils/types";

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

  const delWithConfirm = () => {
    if (item && window.confirm("Are you sure you want to delete this item?")) {
      del(item);
    }
  };

  return (
    <div>
      <h1>Show Member {item && item["@id"]}</h1>

      {loading && (
        <div className="alert alert-info" role="status">
          Loading...
        </div>
      )}
      {error && (
        <div className="alert alert-danger" role="alert">
          <span className="fa fa-exclamation-triangle" aria-hidden="true" />{" "}
          {error.message}
        </div>
      )}
      {deleteError && (
        <div className="alert alert-danger" role="alert">
          <span className="fa fa-exclamation-triangle" aria-hidden="true" />{" "}
          {deleteError.message}
        </div>
      )}

      {item && (
        <table className="table-responsive table-striped table-hover table">
          <thead>
            <tr>
              <th>Field</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">num</th>
              <td>{item["num"]}retrieved</td>
            </tr>
            <tr>
              <th scope="row">firstname</th>
              <td>{item["firstname"]}retrieved</td>
            </tr>
            <tr>
              <th scope="row">lastname</th>
              <td>{item["lastname"]}retrieved</td>
            </tr>
            <tr>
              <th scope="row">email</th>
              <td>{item["email"]}retrieved</td>
            </tr>
            <tr>
              <th scope="row">amount</th>
              <td>{item["amount"]}retrieved</td>
            </tr>
            <tr>
              <th scope="row">date</th>
              <td>{item["date"]}retrieved</td>
            </tr>
            <tr>
              <th scope="row">paymentMethod</th>
              <td>
                <Links
                  items={{
                    href: `/payment_methods/show/${encodeURIComponent(
                      item["paymentMethod"]
                    )}`,
                    name: item["paymentMethod"],
                  }}
                />
              </td>
            </tr>
            <tr>
              <th scope="row">willingToVolunteer</th>
              <td>{item["willingToVolunteer"]}retrieved</td>
            </tr>
          </tbody>
        </table>
      )}
      <Link to="/members/" className="btn btn-primary">
        Back to list
      </Link>
      {item && (
        <Link to={`/members/edit/${encodeURIComponent(item["@id"])}`}>
          <button className="btn btn-warning">Edit</button>
        </Link>
      )}
      <button onClick={delWithConfirm} className="btn btn-danger">
        Delete
      </button>
    </div>
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
