import React, { FC } from 'react';

import styles from './styles/ArrowButton.module.scss';
import { ArrowButtonType } from './types';

export const ArrowButton: FC<ArrowButtonType> = props => {
  const { disabled, onClick, isPrevArrow } = props;

  const handleOnClick = (): void => onClick();

  return (
    <button
      className={
        disabled ? `${styles.arrowButton} ${styles.disabled}` : styles.arrowButton
      }
      type="button"
      onClick={handleOnClick}
      disabled={disabled}
    >
      <svg
        width="8"
        height="12"
        viewBox="0 0 8 12"
        fill="#808080"
        xmlns="http://www.w3.org/2000/svg"
      >
        {isPrevArrow ? (
          <path d="M3.41436 6.00008L7.70726 1.70718L6.29304 0.292969L0.585938 6.00008L6.29304 11.7072L7.70726 10.293L3.41436 6.00008Z" />
        ) : (
          <path d="M5.58564 6.99814L1.30579 11.304L2.72429 12.714L8.41405 6.98956L2.68966 1.29978L1.27973 2.71827L5.58564 6.99814Z" />
        )}
      </svg>
    </button>
  );
};
