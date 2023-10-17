import "./index.css";
import App from "./App";
import { createRoot } from "react-dom/client";
import AuthProvider from "./provider/AuthProvider";

const container = document.getElementById("root");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
