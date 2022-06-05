import React from 'react';
import { GlobalStyle } from '../src/shared/styles/global.styles';

import { Routes } from './routes/routes';

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes />
    </>
  );
}

export default App;
