import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { LandingPage } from '@domain/landing/landing.page';
import { LoginPage } from '@domain/auth/login/login.page';
import { ForgotPassword } from '@domain/auth/forgot-password/forgot-password.page';
import { PrivateRouteWrapper } from './private-route.wrapper';
import { DASHBOARD_ROUTES } from '@domain/dashboard/components/dashboard-wrapper/dashboard-wrapper.constants';
import { PaymentProvider } from '@domain/dashboard/paymet/utils/usePaymet.component';
import { Payment } from '@domain/dashboard/paymet/paymet.component';
import { ADMIN_ROUTES } from '@domain/admin/components/admin-wrapper/admin-wrapper.constants';
import { RegisterComponent } from '@domain/auth/register-user/register-user-page';

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={LandingPage} />
      <Route path="/login" exact component={LoginPage} />
      <Route path="/register" exact component={RegisterComponent} />
      <Route path="/forgot-pass" exact component={ForgotPassword} />
      <PrivateRouteWrapper path={DASHBOARD_ROUTES.DASHBOARD} />
      <PrivateRouteWrapper path={DASHBOARD_ROUTES.MY_PRODUCTS} />
      <PrivateRouteWrapper path={DASHBOARD_ROUTES.SUPPORT} />
      <PrivateRouteWrapper path={DASHBOARD_ROUTES.BALANCE} />
      <PrivateRouteWrapper path={DASHBOARD_ROUTES.MARKET} />
      <PrivateRouteWrapper isAdmin path={ADMIN_ROUTES.ADMIN} />
      <Route
        path="/payment/:productId"
        component={() => (
          <PaymentProvider>
            <Payment />
          </PaymentProvider>
        )}
      />
    </Switch>
  </BrowserRouter>
);
