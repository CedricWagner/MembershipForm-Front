import { Route } from "react-router-dom";
import { List, Create, Update, Show } from "../crud/paymentmethod/";

const routes = [
  <Route path="/payment_methods/create" element={<Create />} key="create" />,
  <Route path="/payment_methods/edit/:id" element={<Update />} key="update" />,
  <Route path="/payment_methods/show/:id" element={<Show />} key="show" />,
  <Route path="/payment_methods" element={<List />} key="list" />,
  <Route path="/payment_methods/:page" element={<List />} key="page" />,
];

export default routes;
