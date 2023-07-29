import React, { FC } from 'react';
import LogoWebp from "../../assets/images/logo.webp";
import LogoPng from "../../assets/images/logo.png";


interface LogoProps {}

const Logo: FC<LogoProps> = () => (
  <div data-testid="Logo" className='w-20 h-20'>
    <picture>
      <source srcSet={LogoWebp}></source>
      <img 
        alt="Logo de la Maison Citoyenne"
        src={LogoPng}
        height="80" width="80"
        />
    </picture>
  </div>
);

export default Logo;
