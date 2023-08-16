import { Link, Navigate, useParams } from "react-router-dom";
import Form from "./Form";
import { useDelete, useRetrieve, useUpdate } from "../../hooks";
import TResource from "./type";
import { TError } from "../../utils/types";
import Container from "../../components/Container/Container";
import PageTitle from "../../components/PageTitle/PageTitle";
import SuccessMessage from "../../components/SuccessMessage/SuccessMessage";
import Waiting from "../../components/Waiting/Waiting";
import FormErrorMessage from "../../components/FormErrorMessage/FormErrorMessage";

interface UpdateProps {
  retrieved: TResource | null;
  retrieveLoading: boolean;
  retrieveError: TError;
  updateLoading: boolean;
  updateError: TError;
  deleteLoading: boolean;
  deleteError: TError;
  created: TResource | null;
  updated: TResource | null;
  deleted: TResource | null;
  del: (item: TResource) => any;
  update: (item: TResource, values: Partial<TResource>) => any;
  reset: () => void;
}

const UpdateView = ({
  created,
  del,
  deleteError,
  deleteLoading,
  deleted,
  retrieveError,
  retrieveLoading,
  retrieved,
  update,
  updateError,
  updateLoading,
  updated,
  reset,
}: UpdateProps) => {
  if (deleted) {
    return <Navigate to="/members/" replace />;
  }

  const item = updated ? updated : retrieved;
  const delWithConfirm = () => {
    if (
      retrieved &&
      window.confirm(
        "Êtes vous certain·e de vouloir supprimer cette adhésion ?"
      )
    ) {
      del(retrieved);
    }
  };

  return (
    <Container>
      <PageTitle>Modifier l'adhésion {item && item["@id"]}</PageTitle>

      {created && <SuccessMessage>{created["@id"]} créé.</SuccessMessage>}
      {updated && (
        <SuccessMessage>{updated["@id"]} mis à jours.</SuccessMessage>
      )}
      {(retrieveLoading || updateLoading || deleteLoading) && (
        <Waiting isInline={true} />
      )}
      {retrieveError && (
        <FormErrorMessage>{retrieveError.message}</FormErrorMessage>
      )}
      {updateError && (
        <FormErrorMessage>{updateError.message}</FormErrorMessage>
      )}
      {deleteError && (
        <FormErrorMessage>{deleteError.message}</FormErrorMessage>
      )}

      {item && (
        <Form
          onSubmit={(values) => {
            reset();
            update(item, values);
          }}
          error={updateError}
          reset={reset}
          initialValues={item}
        />
      )}
      <Link to="/members/" className="btn btn-link">
        Retour à la liste
      </Link>
      <button onClick={delWithConfirm} className="btn btn-danger">
        Supprimer
      </button>
    </Container>
  );
};

const Update = () => {
  const { id } = useParams<{ id: string }>();
  const {
    retrieved,
    loading: retrieveLoading,
    error: retrieveError,
  } = useRetrieve<TResource>(decodeURIComponent(id || ""));
  const {
    updated,
    update,
    reset,
    loading: updateLoading,
    error: updateError,
  } = useUpdate<TResource>();
  const {
    deleted,
    loading: deleteLoading,
    error: deleteError,
    del,
  } = useDelete<TResource>();

  return (
    <UpdateView
      retrieved={retrieved}
      retrieveLoading={retrieveLoading}
      retrieveError={retrieveError}
      updateLoading={updateLoading}
      updateError={updateError}
      deleteLoading={deleteLoading}
      deleteError={deleteError}
      created={null}
      updated={updated}
      deleted={deleted}
      del={del}
      update={update}
      reset={reset}
    />
  );
};

export default Update;
