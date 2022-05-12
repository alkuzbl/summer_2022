import React, { FC } from 'react';
import './style/Spinner.scss';

export const Spinner: FC = () => (
  <div className="spinner-wrapper">
    <div className="spinner">
      <div className="bounce1" />
      <div className="bounce2" />
      <div className="bounce3" />
    </div>
  </div>
);
