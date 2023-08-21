import React, { FC } from "react";
import { Link } from "react-router-dom";

interface NavigationBlockProps {
  title: string;
  href: string;
  picto: React.ReactNode;
}

const NavigationBlock: FC<NavigationBlockProps> = ({ title, href, picto }) => (
  <Link
    data-testid="NavigationBlock"
    to={href}
    className={`btn btn-link mb-3 mt-0 flex flex-col items-center justify-center border shadow-sm`}
  >
    <span className="block" aria-hidden="true">
      {picto}
    </span>
    <span className="pl-3">{title}</span>
  </Link>
);

export default NavigationBlock;
