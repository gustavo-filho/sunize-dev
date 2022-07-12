import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { LandingPage } from '@domain/landing/landing.page';
import { LoginPage } from '@domain/auth/login/login.page';
import { ForgotPassword } from '@domain/auth/forgot-password/forgot-password.page';
import { PrivateRouteWrapper } from './private-route.wrapper';
import { DASHBOARD_ROUTES } from '@domain/dashboard/components/dashboard-wrapper/dashboard-wrapper.constants';

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={LandingPage} />
      <Route path="/login" exact component={LoginPage} />
      <Route path="/forgot-pass" exact component={ForgotPassword} />
      <PrivateRouteWrapper path={DASHBOARD_ROUTES.DASHBOARD} />
      <PrivateRouteWrapper path={DASHBOARD_ROUTES.MY_PRODUCTS} />
      <PrivateRouteWrapper path={DASHBOARD_ROUTES.SUPPORT} />
      <PrivateRouteWrapper path={DASHBOARD_ROUTES.BALANCE} />
      <PrivateRouteWrapper path={DASHBOARD_ROUTES.MARKET} />
    </Switch>
  </BrowserRouter>
);
