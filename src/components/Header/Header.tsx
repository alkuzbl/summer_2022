import React, { FC, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Logo } from '../Logo/Logo';
import { SearchField } from '../SearchField/SearchField';

import styles from './styles/Header.module.scss';

export const Header: FC = () => {
  const [searchValue, setSearchValue] = useState('');

  const navigate = useNavigate();

  const handleOnChange = (value: string): void => {
    setSearchValue(value);
  };

  const searchUser = (): void => {
    if (searchValue) {
      navigate(`/users/${searchValue}`);
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles.header__wrapper}>
        <div className={styles.header__logo}>
          <Logo link="/" />
        </div>
        <SearchField
          onChange={handleOnChange}
          onKeyPress={searchUser}
          value={searchValue}
          placeholder="Enter GitHub username"
        />
      </div>
    </div>
  );
};
