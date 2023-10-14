import { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Logo from "./components/Logo/Logo";
import MenuBurger from "./components/MenuBurger/MenuBurger";
import Navigation from "./components/Navigation/Navigation";
import ExportMembers from "./pages/ExportMembers/ExportMembers";
import memberRoutes from "./routes/member";
import paymentMethodsRoutes from "./routes/paymentmethod";

function App() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  function onToggleMenuBurger() {
    setMobileMenuOpen(!isMobileMenuOpen);
  }
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-primary p-2 text-white">
        <div className="container mx-auto flex items-center justify-between">
          <a href={"/"}>
            <Logo />
          </a>
          <MenuBurger isOpen={isMobileMenuOpen} onToggle={onToggleMenuBurger} />
        </div>
      </header>
      <div className="col-span-7 xl:col-span-8 2xl:col-span-9">
        <BrowserRouter>
          <Navigation
            isMobileMenuOpen={isMobileMenuOpen}
            onItemSelect={onToggleMenuBurger}
          />
          <main id="main-content">
            <Routes>
              <Route path="/" element={<Home />} key="home" />
              <Route
                path="/members/export"
                element={<ExportMembers />}
                key="export-members"
              />
              {memberRoutes}
              {paymentMethodsRoutes}
            </Routes>
          </main>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
