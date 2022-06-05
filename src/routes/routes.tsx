import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom';
import { LandingPage } from '@domain/landing/landing.page';
import { LoginPage } from '@domain/auth/login/login.page';
import { ForgotPassword } from '@domain/auth/forgot-password/forgot-password.page';

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-pass" element={<ForgotPassword />} />
    </Switch>
  </BrowserRouter>
);
