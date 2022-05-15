import React, { FC, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { getRepositories } from '../../redux/middlewares/getRepositories';
import { AppDispatch, RootState } from '../../redux/store';
import { InitStateRepositoryType, RepositoryType } from '../../redux/types';
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
  const {
    status: repositoryStatus,
    currentPage,
    perPage,
  } = useSelector<RootState, InitStateRepositoryType>(state => state.repository);

  useEffect(() => {
    if (publicRepos && login) {
      dispatch(getRepositories({ page: currentPage, perPage, userName: login }));
    }
  }, [login, currentPage]);

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

      {publicRepos >= perPage && (
        <div className={styles.repositories__pagination}>
          <Pagination totalCount={publicRepos} perPage={perPage} />
        </div>
      )}

      <div
        className={
          repositoryStatus === 'loading'
            ? `${styles.modal} ${styles.active}`
            : styles.modal
        }
      >
        <Spinner />
      </div>
    </div>
  );
};
