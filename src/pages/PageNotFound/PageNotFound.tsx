import React, { FC } from 'react';

import { Icon } from '../../components/Icon/Icon';

import icon404 from 'assets/images/icon_404.svg';

export const PageNotFound: FC = () => (
  <div className="container">
    <Icon icon={icon404} title="Page not found" />
  </div>
);
