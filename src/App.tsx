import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Logo from "./components/Logo/Logo";
import MenuBurger from "./components/MenuBurger/MenuBurger";
import Navigation from "./components/Navigation/Navigation";
import Subscription from "./crud/member/Subscription";
import SubscriptionSuccess from "./crud/member/SubscriptionSuccess";
import ExportMembers from "./pages/ExportMembers/ExportMembers";
import { useAuth } from "./provider/AuthProvider";
import memberRoutes from "./routes/member";
import paymentMethodsRoutes from "./routes/paymentmethod";
import userRoutes from "./routes/user";
import useCheckTokenValidity from "./hooks/check-token-validity";

function App() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  function onToggleMenuBurger() {
    setMobileMenuOpen(!isMobileMenuOpen);
  }
  const { token, setToken } = useAuth();
  const { isValid } = useCheckTokenValidity();

  useEffect(() => {
    if (!isValid) {
      setToken(null);
    }
  }, [isValid]);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-primary p-2 text-white">
        <div className="container mx-auto flex items-center justify-between">
          <a href={"/"}>
            <Logo />
          </a>
          {token && (
            <MenuBurger
              isOpen={isMobileMenuOpen}
              onToggle={onToggleMenuBurger}
            />
          )}
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
              {token && (
                <>
                  <Route
                    path="/members/export"
                    element={<ExportMembers />}
                    key="export-members"
                  />
                  {memberRoutes}
                  {paymentMethodsRoutes}
                </>
              )}
              <Route path="/" element={<Home />} key="home" />
              {userRoutes}
              <Route path="*" element={<Home />} key="404" />
              <Route
                path="/members/subscribe"
                element={<Subscription />}
                key="subscribe"
              />
              ,
              <Route
                path="/members/subscribe/success/:num"
                element={<SubscriptionSuccess />}
                key="subscribe-success"
              />
              ,
            </Routes>
          </main>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
