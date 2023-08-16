import { Route } from "react-router-dom";
import { List, Show } from "../crud/paymentmethod/";

const routes = [
  <Route path="/payment_methods/show/:id" element={<Show />} key="show" />,
  <Route path="/payment_methods" element={<List />} key="list" />,
  <Route path="/payment_methods/:page" element={<List />} key="page" />,
];

export default routes;
