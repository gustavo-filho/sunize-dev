import React from 'react';
import { GlobalStyle } from './shared/styles/global.styles';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { Button } from '@mui/material';
import { SET_USER } from './domain/dashboard/dashboard.store';

function App() {
  const dashboard = useAppSelector(state => state.dashboard);

  const dispatch = useAppDispatch();

  return (
    <>
      <GlobalStyle />
      {dashboard.user.name}
      <Button
        onClick={() => {
          dispatch(
            SET_USER({
              name: 'test',
              test: 'tes',
            }),
          );
        }}
      >
        testesasfas
      </Button>
    </>
  );
}

export default App;
