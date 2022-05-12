import React, { FC } from 'react';

import { Icon } from '../../components/Icon/Icon';

import iconSearch from 'assets/images/icon_search.svg';

export const StartPage: FC = () => (
  <div className="container">
    <Icon icon={iconSearch} title="Start with searching a GitHub user" />
  </div>
);
