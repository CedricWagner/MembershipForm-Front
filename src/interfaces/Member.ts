import { ApiResource } from "../utils/types";

export interface Member extends ApiResource {
  num?: number;
  firstname?: string;
  lastname?: string;
  email?: string;
  amount?: string;
  date?: string;
  paymentMethod?: string | null;
  willingToVolunteer?: boolean;
}
