import { ENTRYPOINT } from "../config/entrypoint";
import { useAuth } from "../provider/AuthProvider";
import { SubmissionErrors, SubmissionError } from "../utils/types";

interface FetchResponse {
  readonly response: Response;
  readonly json: any;
}

export interface IFetchStore {
  fetch: (input: RequestInfo, init?: RequestInit) => Promise<FetchResponse>;
}

const normalizeUrl = (url: string) => {
  return String(new URL(url, ENTRYPOINT));
};

const normalizeInput = (input: RequestInfo): RequestInfo => {
  if (typeof input === "string") {
    return normalizeUrl(input);
  }

  return { ...input, url: normalizeUrl(input.url) };
};

const MIME_TYPE = "application/ld+json";

const normalizeHeaders = (options: RequestInit): RequestInit => {
  if (!(options.headers instanceof Headers)) {
    options.headers = new Headers(options.headers);
  }

  return options;
};

const normalizeContentType = (options: RequestInit): RequestInit => {
  if (
    "undefined" !== options.body &&
    !(options.body instanceof FormData) &&
    options.headers instanceof Headers &&
    null === options.headers.get("Content-Type")
  ) {
    options.headers.set("Content-Type", MIME_TYPE);
  }

  return options;
};

const normalizeAuth = (auth: string) => {
  return (options: RequestInit): RequestInit => {
    if (
      auth &&
      options.headers instanceof Headers &&
      null === options.headers.get("Authorization")
    ) {
      options.headers.set("Authorization", auth);
    }

    return options;
  };
};

// Error handling
const regularHandler = (response: Response, json: any) => {
  const error =
    json["hydra:description"] ||
    json["hydra:title"] ||
    json["message"] ||
    "An error occurred.";

  throw new Error(error);
};

// Remove token if necessary
const tokenHandler = (json: any, setToken: (token: string | null) => void) => {
  if (json.message == "Expired JWT Token") {
    setToken(null);
  }
};

const submissionHandler = (response: Response, json: any) => {
  if (!json.violations) {
    return;
  }

  const error =
    json["hydra:description"] ||
    json["hydra:title"] ||
    json["message"] ||
    "An error occurred.";

  const violations: {
    propertyPath: string;
    message?: string;
    title?: string;
  }[] = json.violations.violations || json.violations;

  const errors = violations.reduce((errors, violation) => {
    const violationMessage =
      violation.message ||
      violation.title ||
      "Ce champ présente une valeur incorrecte";
    if (errors[violation.propertyPath]) {
      errors[violation.propertyPath] += "\n" + violationMessage;
    } else {
      errors[violation.propertyPath] = violationMessage;
    }

    return errors;
  }, {} as SubmissionErrors);

  throw new SubmissionError(error, errors);
};

const useFetch = (): IFetchStore => {
  const { token, setToken } = useAuth();

  return {
    fetch(input, init = {}) {
      input = normalizeInput(input);
      init = [
        normalizeHeaders,
        normalizeContentType,
        // normalizeAuth(token),
        normalizeAuth(token ? "Bearer " + token : ""), // TODO: find another workaround
      ].reduce((init, normalize) => normalize(init), init);

      if (init.method === "DELETE") {
        return fetch(input, init).then((response) => ({
          response,
          json: null,
        }));
      }

      return fetch(input, init)
        .then((response) =>
          response
            .json()
            .then<{ response: Response; json: object }>((json) => ({
              response,
              json,
            }))
            .catch(() => {
              throw new Error(response.statusText || "An error occurred.");
            })
        )
        .then((data) => {
          if (!data.response.ok) {
            submissionHandler(data.response, data.json);
            tokenHandler(data.json, setToken);
            regularHandler(data.response, data.json);
          }

          return data;
        });
    },
  };
};

export default useFetch;
