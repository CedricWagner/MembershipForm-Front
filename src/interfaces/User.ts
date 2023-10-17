import { ApiResource } from "../utils/types";

export interface User extends ApiResource {
  email: string;
  password: string;
}
