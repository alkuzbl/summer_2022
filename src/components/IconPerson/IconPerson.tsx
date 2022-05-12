import React, { FC } from 'react';

import { reduceNumberByThousand } from '../../utils/reduceNumberByThousand';

import styles from './styles/IconPerson.module.scss';
import { IconPersonPropsType } from './types';

export const IconPerson: FC<IconPersonPropsType> = props => {
  const { icon, numberSubscriptions, text } = props;

  const value = reduceNumberByThousand(numberSubscriptions);

  return (
    <div className={styles.icon}>
      <img className={styles.icon__img} src={icon} alt="users" />
      <span className={styles.icon__count}>{value}</span>
      <span>{text}</span>
    </div>
  );
};
