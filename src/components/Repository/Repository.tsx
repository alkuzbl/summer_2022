import React, { FC } from 'react';

import styles from './styles/Repository.module.scss';
import { RepositoryPropsType } from './types';

export const Repository: FC<RepositoryPropsType> = props => {
  const { link, description, title } = props;

  return (
    <div className={styles.repository}>
      <h4 className={styles.repository__title}>
        <a
          className={styles.repository__link}
          href={link}
          target="_blank"
          rel="noreferrer"
        >
          {title}
        </a>
      </h4>
      <p className={styles.repository__description}>{description}</p>
    </div>
  );
};
