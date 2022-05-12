import React, { ChangeEvent, KeyboardEvent, FC } from 'react';

import styles from './styles/SearchFIeld.module.scss';
import { SearchFieldPropsType } from './types';

import icon from 'assets/images/icon_search.svg';

export const SearchField: FC<SearchFieldPropsType> = props => {
  const { value, onChange, placeholder, onKeyPress } = props;

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
    onChange(e.currentTarget.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && onKeyPress) {
      onKeyPress(value);
    }
    if (e.key === 'Escape') {
      onChange('');
    }
  };

  return (
    <div className={styles.search}>
      <img className={styles.search__icon} src={icon} alt="search" />
      <input
        className={styles.search__input}
        type="text"
        value={value}
        onChange={handleOnChange}
        placeholder={placeholder}
        onKeyUp={handleKeyPress}
      />
    </div>
  );
};
