import React from 'react';
import { GlobalStyle } from '@shared/styles/global.styles';
import 'react-toastify/dist/ReactToastify.css';

import { Routes } from './routes/routes';
import { ToastContainer } from 'react-toastify';
import { UserContextProvider } from '@shared/contexts/user-context/user.context';

function App() {
  return (
    <UserContextProvider>
      <GlobalStyle />
      <Routes />
      <ToastContainer />
    </UserContextProvider>
  );
}

export default App;
