import React, { FC, useEffect } from "react";
import Container from "../Container/Container";
import NavigationBlock from "../NavigationBlock/NavigationBlock";
import {
  HiUser,
  HiUserAdd,
  HiCreditCard,
  HiDocumentDownload,
  HiLogout,
} from "react-icons/hi";
import PageTitle from "../PageTitle/PageTitle";
import { useAuth } from "../../provider/AuthProvider";
import { useNavigate } from "react-router-dom";

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const { token, setToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  return (
    <div data-testid="Home">
      <Container>
        <PageTitle>Gestion des adhésions / Maison Citoyenne</PageTitle>
        <div className="mt-6 grid grid-cols-3 gap-4">
          <NavigationBlock
            title="Nouvel adhérent"
            href="/members/subscribe"
            picto={<HiUserAdd size={40} />}
          />
          <NavigationBlock
            title="Liste des adhérents"
            href="/members"
            picto={<HiUser size={40} />}
          />
          <NavigationBlock
            title="Exporter les adhérents"
            href="/members/export"
            picto={<HiDocumentDownload size={40} />}
          />
          <NavigationBlock
            title="Liste des moyens de paiement"
            href="/payment_methods"
            picto={<HiCreditCard size={40} />}
          />
          <NavigationBlock
            title="Se déconnecter"
            href="#"
            picto={<HiLogout size={40} />}
            onClick={() => {
              setToken(null);
            }}
          />
        </div>
      </Container>
    </div>
  );
};

export default Home;
