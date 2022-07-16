import { Admin } from '@domain/admin/admin.page';
import { Checkout } from '@domain/admin/financial/checkout/checkout.page';
import { Refunds } from '@domain/admin/financial/refunds/refunds.page';
import { Renevue } from '@domain/admin/financial/renevue/renevue.page';
import { Transactions } from '@domain/admin/financial/transactions/transactions.page';
import { Infra } from '@domain/admin/infra/infra.page';
import { Complaints } from '@domain/admin/production/complaints/complaints.page';
import { DocumentsControl } from '@domain/admin/production/documents-control/documents-control.page';
import { ProductReviews } from '@domain/admin/production/product-reviews/product-reviews.page';
import { EmployeesControl } from '@domain/admin/production/users-control/employees/employees-control.page';
import { UsersControl } from '@domain/admin/production/users-control/users/users-control.page';

export const ADMIN_ROUTES = {
  ADMIN: '/admin',

  FINANCIAL_RENEVUE: '/admin/financeiro/receitas',
  FINANCIAL_TRANSACTIONS: '/admin/financeiro/transacoes',
  FINANCIAL_REFUNDS: '/admin/financeiro/reembolsos',
  FINANCIAL_CHECKOUT: '/admin/financeiro/checkout',

  PRODUCTS_REVIEWS: '/admin/producao/revisao-produtos',
  USERS_CONTROL: '/admin/producao/controle-usuarios',
  EMPLOYEES_CONTROL: '/admin/producao/controle-funcionarios',
  DOCUMENTS_CONTROL: '/admin/producao/revisao-documentos',
  COMPLAINTS: '/admin/producao/denuncias',

  INFRA: '/admin/infraestrutura',
};

interface AdminWrapperConstantsProps {
  route: string;
}

export const AdminWrapperConstants = ({
  route,
}: AdminWrapperConstantsProps) => {
  const components: { [key: string]: JSX.Element } = {
    [ADMIN_ROUTES.ADMIN]: <Admin />,

    [ADMIN_ROUTES.FINANCIAL_RENEVUE]: <Renevue />,
    [ADMIN_ROUTES.FINANCIAL_TRANSACTIONS]: <Transactions />,
    [ADMIN_ROUTES.FINANCIAL_REFUNDS]: <Refunds />,
    [ADMIN_ROUTES.FINANCIAL_CHECKOUT]: <Checkout />,

    [ADMIN_ROUTES.PRODUCTS_REVIEWS]: <ProductReviews />,
    [ADMIN_ROUTES.USERS_CONTROL]: <UsersControl />,
    [ADMIN_ROUTES.EMPLOYEES_CONTROL]: <EmployeesControl />,
    [ADMIN_ROUTES.DOCUMENTS_CONTROL]: <DocumentsControl />,
    [ADMIN_ROUTES.COMPLAINTS]: <Complaints />,

    [ADMIN_ROUTES.INFRA]: <Infra />,
  };

  return <>{components[route]}</>;
};
