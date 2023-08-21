import React, { FC } from "react";
import Container from "../Container/Container";
import NavigationBlock from "../NavigationBlock/NavigationBlock";
import { HiHome, HiUser, HiUserAdd, HiCreditCard } from "react-icons/hi";
import PageTitle from "../PageTitle/PageTitle";

interface HomeProps {}

const Home: FC<HomeProps> = () => (
  <div data-testid="Home">
    <Container>
      <PageTitle>Gestion des adhésions / Maison Citoyenne</PageTitle>
      <div className="mt-6 grid grid-cols-3 gap-4">
        <NavigationBlock
          title="Nouvel adhérent"
          href="/members/create"
          picto={<HiUserAdd size={40} />}
        />
        <NavigationBlock
          title="Liste des adhérents"
          href="/members"
          picto={<HiUser size={40} />}
        />
        <NavigationBlock
          title="Liste des moyens de paiement"
          href="/payment_methods"
          picto={<HiCreditCard size={40} />}
        />
      </div>
    </Container>
  </div>
);

export default Home;
