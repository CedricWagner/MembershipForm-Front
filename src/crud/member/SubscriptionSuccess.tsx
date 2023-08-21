import React, { FC } from "react";
import { useParams } from "react-router-dom";
import Container from "../../components/Container/Container";
import NavigationBlock from "../../components/NavigationBlock/NavigationBlock";
import SuccessMessage from "../../components/SuccessMessage/SuccessMessage";
import { HiUserAdd } from "react-icons/hi";

interface SubscriptionSuccessProps {}

const SubscriptionSuccess: FC<SubscriptionSuccessProps> = () => {
  const { num } = useParams<{ num: string }>();

  return (
    <div data-testid="SubscriptionSuccess">
      <Container>
        <div className="flex flex-col items-center justify-center">
          <SuccessMessage>
            Adhésion enregistrée ! <br />
            Votre numéro d'adhérent est le{" "}
            <span className="text-3xl text-green-500">{num}</span>
          </SuccessMessage>
          <div className="my-4"></div>
          <NavigationBlock
            href="/members/subscribe"
            picto={<HiUserAdd size={40} />}
            title="Saisir une nouvelle adhésion"
          />
        </div>
      </Container>
    </div>
  );
};

export default SubscriptionSuccess;
