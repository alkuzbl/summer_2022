import React, { FC } from 'react';

import { UserType } from '../../redux/types';
import { IconPerson } from '../IconPerson/IconPerson';

import styles from './styles/Profile.module.scss';

import person from 'assets/images/person.svg';
import persons from 'assets/images/persons.svg';

export type ProfilePropsType = {
  user: UserType;
};

export const Profile: FC<ProfilePropsType> = ({ user }) => {
  const { avatar_url: avatar, name, login, html_url: url, following, followers } = user;

  return (
    <div className={styles.profile}>
      <img className={styles.profile__img} src={avatar} alt="user" />
      <p className={styles.profile__title}>{name}</p>
      <a className={styles.profile__link} href={url} target="_blank" rel="noreferrer">
        {login}
      </a>

      <div className={styles.profile__inner}>
        <IconPerson icon={persons} numberSubscriptions={followers} text="followers" />
        <IconPerson icon={person} numberSubscriptions={following} text="following" />
      </div>
    </div>
  );
};
