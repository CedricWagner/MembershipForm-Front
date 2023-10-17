import { useState } from "react";
import { ApiResource, TError } from "../utils/types";
import useFetch from "./fetch";

interface ILoginStore<Resource extends ApiResource> {
  error: TError;
  loading: boolean;
  token: string | null;
  reset: () => void;
  login: (values: Partial<Resource>) => Promise<void>;
}

const useLogin = <Resource extends ApiResource>(): ILoginStore<Resource> => {
  const { fetch } = useFetch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<TError>(null);
  const [token, setToken] = useState<string | null>(null);

  return {
    error,
    loading,
    token,
    reset() {
      setLoading(false);
      setError(null);
    },
    login(values) {
      setLoading(true);

      return fetch("auth", {
        method: "POST",
        body: JSON.stringify(values),
      })
        .then(({ json }) => json)
        .then((retrieved) => setToken(retrieved.token))
        .catch((e) => {
          setError(e);
        })
        .finally(() => setLoading(false));
    },
  };
};

export default useLogin;
