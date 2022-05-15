import React, { FC } from 'react';

import { Link } from 'react-router-dom';

import { LogoPropsType } from './types';

import logo from 'assets/images/Logo.svg';

export const Logo: FC<LogoPropsType> = props => {
  const { link, onClick } = props;

  const handleClick = (): void => {
    onClick && onClick();
  };

  return (
    <Link to={link} onClick={handleClick}>
      <img src={logo} alt="logo" />
    </Link>
  );
};
