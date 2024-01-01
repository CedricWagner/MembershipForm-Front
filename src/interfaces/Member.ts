import { ApiResource } from "../utils/types";
import { PaymentMethod } from "./PaymentMethod";

export interface Member extends ApiResource {
  num?: number;
  firstname?: string;
  lastname?: string;
  email?: string;
  amount?: string;
  date?: string;
  paymentMethod?: string | PaymentMethod | null;
  willingToVolunteer?: boolean;
  subscribedToNewsletter?: boolean;
}
