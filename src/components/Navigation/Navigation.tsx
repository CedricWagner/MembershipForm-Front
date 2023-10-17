import { FC } from "react";
import {
  HiHome,
  HiUser,
  HiUserAdd,
  HiCreditCard,
  HiDocumentDownload,
  HiLogout,
} from "react-icons/hi";
import { useAuth } from "../../provider/AuthProvider";
import NavigationItem from "../NavigationItem/NavigationItem";

interface NavigationProps {
  isMobileMenuOpen?: boolean;
  onItemSelect: () => void;
}

const Navigation: FC<NavigationProps> = ({
  isMobileMenuOpen = false,
  onItemSelect,
}) => {
  const { token, setToken } = useAuth();
  return (
    <>
      {isMobileMenuOpen && (
        <div className="top-18 fixed left-0 z-10 h-full w-full bg-dark bg-opacity-50"></div>
      )}
      <nav
        className={`top-18 z-20 w-full  ${
          isMobileMenuOpen ? "fixed" : "hidden"
        }`}
      >
        <ul
          data-testid="Navigation"
          id="main-menu"
          className="container mx-auto flex-wrap gap-4 bg-white px-4"
        >
          {token && (
            <>
              <NavigationItem
                href="/"
                title="Accueil"
                picto={<HiHome />}
                onSelect={onItemSelect}
              />
              <NavigationItem
                href="/members/subscribe"
                title="Nouvel adhérent"
                picto={<HiUserAdd />}
                onSelect={onItemSelect}
              />
              <NavigationItem
                href="/members"
                title="Liste des adhésions"
                picto={<HiUser />}
                onSelect={onItemSelect}
              />
              <NavigationItem
                href="/members/export"
                title="Exporter les adhésions"
                picto={<HiDocumentDownload />}
                onSelect={onItemSelect}
              />
              <NavigationItem
                href="/payment_methods"
                title="Liste des moyens de paiement"
                picto={<HiCreditCard />}
                onSelect={onItemSelect}
              />
              <NavigationItem
                href="#"
                title="Se déconnecter"
                picto={<HiLogout />}
                onSelect={() => {
                  setToken(null);
                  onItemSelect();
                }}
              />
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
