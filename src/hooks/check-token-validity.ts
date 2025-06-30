import { useAuth } from "../provider/AuthProvider";
import { ENTRYPOINT } from "./../config/entrypoint";
import { useEffect, useState } from "react";
import useFetch from "./fetch";

interface ITokenValidityStore {
  isValid: boolean;
}

const useCheckTokenValidity = (): ITokenValidityStore => {
  const [isValid, setIsValid] = useState(true);

  const { fetch } = useFetch();

  
  useEffect(() => {
    fetch(ENTRYPOINT + "token/validate", {
      method: "GET",
    })
    .then((response) => {
        return response.json;
    })
    .then((json) => {
      if (!json.valid) {
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    })
    .catch((e) => {
        setIsValid(false);
    });
  });

  return {
      isValid: isValid
  }

};

export default useCheckTokenValidity;
