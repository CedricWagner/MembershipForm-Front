import { lang } from "@/types";
import { FC } from "react";

interface HeroButtonProps {
  classes?: string[];
  onClick: (params: any) => void;
  title: string;
  lang?: lang;
  children?: React.ReactNode;
}

const HeroButton: FC<HeroButtonProps> = ({
  classes = [""],
  onClick,
  children,
  title,
  lang,
}) => {
  return (
    <button
      data-testid="HeroButton"
      className={`btn dark:btn-dark btn-light py-1 px-1 ${classes.join(" ")}`}
      onClick={onClick}
      title={title}
      lang={lang}
    >
      {children}
    </button>
  );
};

export default HeroButton;
