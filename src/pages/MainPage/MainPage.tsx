import React, { FC, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Profile } from '../../components/Profile/Profile';
import { Repositories } from '../../components/Repositories/Repositories';
import { Spinner } from '../../components/Spinner/Spinner';
import { getUser } from '../../redux/middlewares/getUser';
import { AppDispatch, RootState } from '../../redux/store';
import { StatusType, UserType } from '../../redux/types';
import { UserNotFound } from '../UserNotFound/UserNotFound';

import styles from './styles/MainPage.module.scss';

export const MainPage: FC = () => {
  const { userName } = useParams<string>();
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector<RootState, UserType>(state => state.user.user);
  const userStatus = useSelector<RootState, StatusType>(state => state.user.status);

  useEffect(() => {
    if (userName) {
      dispatch(getUser(userName));
    }
  }, [userName]);

  if (userStatus === 'loading') {
    return <Spinner />;
  }

  if (!user.login) {
    return <UserNotFound />;
  }

  return (
    <div className={styles.mainPage}>
      <div className={styles.mainPage__wrapper}>
        <Profile user={user} />
        <Repositories publicRepos={user.public_repos} login={user.login} />
      </div>
    </div>
  );
};
