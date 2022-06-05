import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom';
import { LandingPage } from '@domain/landing/landing.page';

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" element={<LandingPage />} />
    </Switch>
  </BrowserRouter>
);
