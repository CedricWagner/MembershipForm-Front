import React, { FC } from "react";
import { Link, useLocation } from "react-router-dom";

interface NavigationItemProps {
  title: string;
  href: string;
  picto: React.ReactNode;
  onSelect: () => void;
}

const NavigationItem: FC<NavigationItemProps> = ({
  title,
  href,
  picto,
  onSelect,
}) => {
  const location = useLocation();
  const isActive = location.pathname + location.search === href;

  return (
    <li>
      <Link
        data-testid="NavigationItem"
        to={href}
        onClick={onSelect}
        className={`btn mb-3 mt-0 flex items-center justify-center ${
          isActive ? "btn-primary" : "dark:btn-dark btn-light"
        }`}
      >
        <span className="block h-4 w-4" aria-hidden="true">
          {picto}
        </span>
        <span className="pl-3">{title}</span>
      </Link>
    </li>
  );
};

export default NavigationItem;
