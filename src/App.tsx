import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Logo from "./components/Logo/Logo";
import MembershipForm from "./components/MembershipForm/MembershipForm";
import { Create, List } from "./crud/member";
import MembershipPage from "./pages/MembershipPage/MembershipPage";
import memberRoutes from "./routes/member";

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-primary p-2 text-white">
        <div className="container mx-auto flex items-center justify-between">
          <Logo />
          [Menu]
        </div>
      </header>
      <div className="col-span-7 xl:col-span-8 2xl:col-span-9">
        <BrowserRouter>
          <main id="main-content">
            <Routes>
              <Route path="/form" element={<MembershipPage />} />
              {memberRoutes}
            </Routes>
          </main>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
