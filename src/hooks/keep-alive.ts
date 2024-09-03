import { ENTRYPOINT } from "./../config/entrypoint";
import { useEffect, useState } from "react";

interface IKeepAliveStore {
  sessionErrorText: string;
  hasSessionError: boolean;
}

const useKeepAlive = (duration: number): IKeepAliveStore => {
  const [sessionError, setSessionError] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      return fetch(ENTRYPOINT + "keep-alive", {
        method: "GET",
      })
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          if (json.result !== "OK") {
            setSessionError(
              "Une erreur est survenue, veuillez vous reconnecter."
            );
          } else {
            setSessionError("");
          }
        })
        .catch((e) => {
          setSessionError(
            "Une erreur est survenue, veuillez vous reconnecter. Détails : " + e
          );
        });
    }, duration);
    return () => clearInterval(interval);
  });

  return {
    sessionErrorText: sessionError,
    hasSessionError: sessionError !== "" ? true : false,
  };
};

export default useKeepAlive;
