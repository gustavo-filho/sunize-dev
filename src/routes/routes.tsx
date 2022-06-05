import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom';
import { LandingPage } from '@domain/landing/landing.page';
import { LoginPage } from '@domain/Auth/login/login.page';

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Switch>
  </BrowserRouter>
);
