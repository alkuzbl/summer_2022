import React, { FC } from 'react';

import styles from './styles/Icon.module.scss';
import { IconPropsType } from './types';

export const Icon: FC<IconPropsType> = props => {
  const { icon, title, className } = props;

  return (
    <div className={`${styles.icon} ${className}`}>
      <img className={styles.icon__img} src={icon} alt="user" />
      {title && <p className={styles.icon__title}>{title}</p>}
    </div>
  );
};
