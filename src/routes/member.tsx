import { Route } from "react-router-dom";
import SubscriptionSuccess from "../crud/member/SubscriptionSuccess";
import { List, Create, Update, Show } from "../crud/member";
import Subscription from "../crud/member/Subscription";

const routes = [
  <Route
    path="/members/subscribe"
    element={<Subscription />}
    key="subscribe"
  />,
  <Route
    path="/members/subscribe/success/:num"
    element={<SubscriptionSuccess />}
    key="subscribe-success"
  />,
  <Route path="/members/create" element={<Create />} key="create" />,
  <Route path="/members/edit/:id" element={<Update />} key="update" />,
  <Route path="/members/show/:id" element={<Show />} key="show" />,
  <Route path="/members" element={<List />} key="list" />,
  <Route path="/members/:page" element={<List />} key="page" />,
];

export default routes;
