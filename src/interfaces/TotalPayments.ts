import { ApiResource } from "../utils/types";

export interface TotalPayments extends ApiResource {
  dateStart?: string;
  dateEnd?: string;
  total?: string;
}
