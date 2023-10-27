import { FC } from "react";

interface HeroButtonProps {
  classes?: string[];
  onClick: (params: any) => void;
  title: string;
  children?: React.ReactNode;
}

const HeroButton: FC<HeroButtonProps> = ({
  classes = [""],
  onClick,
  children,
  title,
}) => {
  return (
    <button
      data-testid="HeroButton"
      className={`btn dark:btn-dark btn-light px-1 py-1 ${classes.join(" ")}`}
      onClick={onClick}
      title={title}
    >
      {children}
    </button>
  );
};

export default HeroButton;
