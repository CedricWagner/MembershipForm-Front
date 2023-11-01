import { FC } from "react";
import { useParams } from "react-router-dom";
import Container from "../../components/Container/Container";
import NavigationBlock from "../../components/NavigationBlock/NavigationBlock";
import SuccessMessage from "../../components/SuccessMessage/SuccessMessage";
import { HiCalendar, HiHome, HiUserAdd } from "react-icons/hi";
import { BiHomeSmile } from "react-icons/bi";

interface SubscriptionSuccessProps {}

const SubscriptionSuccess: FC<SubscriptionSuccessProps> = () => {
  const { num } = useParams<{ num: string }>();

  return (
    <div data-testid="SubscriptionSuccess">
      <Container>
        <div className="flex flex-col items-center justify-center text-center md:text-left">
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
          <a
            href="https://www.maison-citoyenne.org/"
            className="btn btn-primary"
          >
            <HiHome className="inline-block" size={20} />
            &nbsp;Accéder au site de la Maison Citoyenne
          </a>
          <a
            href="https://www.maison-citoyenne.org/agenda/"
            className="btn btn-primary"
          >
            <HiCalendar className="inline-block" size={20} />
            &nbsp;Voir nos événements
          </a>
          <p className="flex items-center pt-2 text-xl">
            <span className="pr-2">Bienvenue parmis nous !</span>
            <BiHomeSmile className="inline-block" size={40} />
          </p>
        </div>
      </Container>
    </div>
  );
};

export default SubscriptionSuccess;
