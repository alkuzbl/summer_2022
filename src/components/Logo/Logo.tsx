import React, { FC } from 'react';

import { Link } from 'react-router-dom';

import { LogoPropsType } from './types';

import logo from 'assets/images/Logo.svg';

export const Logo: FC<LogoPropsType> = ({ link }) => (
  <Link to={link}>
    <img src={logo} alt="logo" />
  </Link>
);
