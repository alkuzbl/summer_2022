import React, { FC } from 'react';

import './App.css';

import { Route, Routes } from 'react-router-dom';

import { Header } from '../components/Header/Header';
import { MainPage } from '../pages/MainPage/MainPage';
import { PageNotFound } from '../pages/PageNotFound/PageNotFound';
import { StartPage } from '../pages/StartPage/StartPage';

const App: FC = () => (
  <div className="App">
    <Header />
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/users/:userName" element={<MainPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </div>
);

export default App;
