import React, { FC, useState } from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { clearStore } from '../../redux/reducers/user-reducer';
import { AppDispatch } from '../../redux/store';
import { Logo } from '../Logo/Logo';
import { SearchField } from '../SearchField/SearchField';

import styles from './styles/Header.module.scss';

export const Header: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [searchValue, setSearchValue] = useState('');

  const handleOnChange = (value: string): void => {
    setSearchValue(value);
  };

  const handleOnClickLogo = (): void => {
    dispatch(clearStore());
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
          <Logo link="/" onClick={handleOnClickLogo} />
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
