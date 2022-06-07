import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { LandingPage } from '@domain/landing/landing.page';
import { LoginPage } from '@domain/auth/login/login.page';
import { ForgotPassword } from '@domain/auth/forgot-password/forgot-password.page';
import { PrivateRouteWrapper } from './private-route.wrapper';
import { Dashboard } from '@domain/dashboard/dashboard.page';

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={LandingPage} />
      <Route path="/login" exact component={LoginPage} />
      <Route path="/forgot-pass" exact component={ForgotPassword} />
      <PrivateRouteWrapper path="/dashboard" component={Dashboard} />
    </Switch>
  </BrowserRouter>
);
