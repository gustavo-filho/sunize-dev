import React from 'react';
import { GlobalStyle } from '@shared/styles/global.styles';
import 'react-toastify/dist/ReactToastify.css';

import { Routes } from './routes/routes';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes />
      <ToastContainer />
    </>
  );
}

export default App;
