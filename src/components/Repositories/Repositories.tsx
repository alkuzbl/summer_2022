import React, { FC, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { getRepositories } from '../../redux/middlewares/getRepositories';
import { AppDispatch, RootState } from '../../redux/store';
import { RepositoryType, StatusType } from '../../redux/types';
import { Icon } from '../Icon/Icon';
import { Pagination } from '../Pagination/Pagination';
import { Repository } from '../Repository/Repository';
import { Spinner } from '../Spinner/Spinner';

import styles from './styles/Repositories.module.scss';

import iconEmptyRepository from 'assets/images/icon_rep_empty.svg';

export type RepositoriesPropsType = {
  publicRepos: number;
  login: string;
};

export const Repositories: FC<RepositoriesPropsType> = ({ publicRepos, login }) => {
  const dispatch = useDispatch<AppDispatch>();

  const repositories = useSelector<RootState, RepositoryType[]>(
    state => state.repository.repository,
  );
  const repositoryStatus = useSelector<RootState, StatusType>(
    state => state.repository.status,
  );

  useEffect(() => {
    if (publicRepos && login) {
      dispatch(getRepositories({ page: 1, perPage: 4, userName: login }));
    }
  }, [login]);

  if (repositoryStatus === 'loading') {
    return <Spinner />;
  }

  if (!publicRepos) {
    return (
      <div className={styles.container}>
        <Icon
          icon={iconEmptyRepository}
          title="Repository list is empty"
          className={styles.icon}
        />
      </div>
    );
  }

  return (
    <div className={styles.repositories}>
      <h3 className={styles.repositories__title}>
        Repositories (<span>{publicRepos}</span>)
      </h3>
      {repositories.map(({ html_url: url, name, description, id }) => (
        <Repository key={id} title={name} link={url} description={description} />
      ))}
      <div className={styles.repositories__pagination}>
        <Pagination totalCount={publicRepos} perPage={4} />
      </div>
    </div>
  );
};
