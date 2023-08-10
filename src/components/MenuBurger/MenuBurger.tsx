import { HiMenu, HiX } from "react-icons/hi";
import React, { FC } from "react";
import HeroButton from "../HeroButton/HeroButton";

interface MenuBurgerProps {
  isOpen: boolean;
  onToggle: () => void;
}

const MenuBurger: FC<MenuBurgerProps> = ({ isOpen, onToggle }) => {
  function toggle() {
    onToggle();
  }

  return (
    <HeroButton
      onClick={toggle}
      classes={["rounded-full", "h-10", "w-10"]}
      title={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
    >
      {isOpen ? <HiX size={30} /> : <HiMenu size={30} />}
    </HeroButton>
  );
};

export default MenuBurger;
