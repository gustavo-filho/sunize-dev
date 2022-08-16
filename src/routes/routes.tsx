import {
  ADMIN_COMPONENTS,
  ADMIN_ROUTES,
} from '@domain/admin/components/admin-wrapper/admin-wrapper.constants';
import { AdminWrapper } from '@domain/admin/components/admin-wrapper/admin.wrapper';
import { ForgotPassword } from '@domain/auth/forgot-password/forgot-password.page';
import { LoginPage2FA } from '@domain/auth/login-2fa/login-2fa.page';
import { LoginPage } from '@domain/auth/login/login.page';
import { LoadingPage } from '@domain/auth/register-user/loading-page/loading-page.index';
import { RegisterComponent } from '@domain/auth/register-user/register-user-page';
import {
  DASHBOARD_COMPONENTS,
  DASHBOARD_ROUTES,
} from '@domain/dashboard/components/dashboard-wrapper/dashboard-wrapper.constants';
import { DashboardWrapper } from '@domain/dashboard/components/dashboard-wrapper/dashboard.wrapper';
import { Payment } from '@domain/dashboard/paymet/paymet.component';
import { PaymentProvider } from '@domain/dashboard/paymet/utils/usePaymet.component';
import { LandingPage } from '@domain/landing/landing.page';
import { RefundPage } from '@domain/refund/refund-page.index';
import { BrowserRouter, Route, Routes as Switch } from 'react-router-dom';
import { PrivateRouteWrapper } from './private-route.wrapper';

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/login/2fa" element={<LoginPage2FA />} />
      <Route path="/register" element={<RegisterComponent />} />
      <Route path="/forgot-pass" element={<ForgotPassword />} />
      <Route path="/loading" element={<LoadingPage />} />
      <Route path="/refund" element={<RefundPage />} />

      <Route
        path="/dashboard"
        element={<PrivateRouteWrapper layout={DashboardWrapper} />}
      >
        {Object.entries(DASHBOARD_ROUTES).map(([item, route]) => (
          <Route path={route} element={DASHBOARD_COMPONENTS[route]} />
        ))}
      </Route>

      <Route
        path="/admin"
        element={<PrivateRouteWrapper isAdmin layout={AdminWrapper} />}
      >
        {Object.entries(ADMIN_ROUTES).map(([item, route]) => (
          <Route path={route} element={ADMIN_COMPONENTS[route]} />
        ))}
      </Route>

      <Route
        path="/payment/:productId"
        element={
          <PaymentProvider>
            <Payment />
          </PaymentProvider>
        }
      />
    </Switch>
  </BrowserRouter>
);
