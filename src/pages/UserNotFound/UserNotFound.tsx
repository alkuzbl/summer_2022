import React, { FC } from 'react';

import { Icon } from '../../components/Icon/Icon';

import iconUser from 'assets/images/user.svg';

export const UserNotFound: FC = () => (
  <div className="container">
    <Icon icon={iconUser} title="User not found" />
  </div>
);
