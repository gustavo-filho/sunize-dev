import { Admin } from '@domain/admin/admin.page';
import { Checkout } from '@domain/admin/financial/checkout/checkout.page';
import { RefundsApproved } from '@domain/admin/financial/refunds/approved/refunds-approved.page';
import { RefundsPending } from '@domain/admin/financial/refunds/pending/refunds-pending.page';
import { RefundsRejected } from '@domain/admin/financial/refunds/rejected/refunds-rejected.page';
import { Renevue } from '@domain/admin/financial/renevue/renevue.page';
import { Transactions } from '@domain/admin/financial/transactions/transactions.page';
import { Infra } from '@domain/admin/infra/infra.page';
import { ComplaintsApproved } from '@domain/admin/production/complaints/approved/complaints-approved.page';
import { ComplaintsPending } from '@domain/admin/production/complaints/pending/complaints-pending.page';
import { ComplaintsRejected } from '@domain/admin/production/complaints/rejected/complaints-rejected.page';
import { DocumentsApproved } from '@domain/admin/production/documents-review/approved/documents-approved.page';
import { DocumentsPending } from '@domain/admin/production/documents-review/pending/documents-pending.page';
import { DocumentsRejected } from '@domain/admin/production/documents-review/rejected/documents-rejected.page';
import { ProductsApproved } from '@domain/admin/production/products-review/approved/products-approved.page';
import { ProductsPending } from '@domain/admin/production/products-review/pending/products-pending.page';
import { ProductsRejected } from '@domain/admin/production/products-review/rejected/products-rejected.page';
import { EmployeesControl } from '@domain/admin/production/users-control/employees/employees-control.page';
import { UsersControl } from '@domain/admin/production/users-control/users/users-control.page';

export const ADMIN_ROUTES = {
  ADMIN: '/admin',

  FINANCIAL_RENEVUE: '/admin/financeiro/receitas',
  FINANCIAL_TRANSACTIONS: '/admin/financeiro/transacoes',
  FINANCIAL_CHECKOUT: '/admin/financeiro/checkout',

  REFUNDS_PENDING: '/admin/producao/reembolsos/pendentes',
  REFUNDS_APPROVED: '/admin/producao/reembolsos/aprovados',
  REFUNDS_REJECTED: '/admin/producao/reembolsos/rejeitados',

  PRODUCTS_PENDING: '/admin/producao/revisao-produtos/pendentes',
  PRODUCTS_APPROVED: '/admin/producao/revisao-produtos/aprovados',
  PRODUCTS_REJECTED: '/admin/producao/revisao-produtos/rejeitados',

  USERS_CONTROL: '/admin/producao/controle-usuarios',
  EMPLOYEES_CONTROL: '/admin/producao/controle-funcionarios',

  DOCUMENTS_PENDING: '/admin/producao/revisao-documentos/pendentes',
  DOCUMENTS_APPROVED: '/admin/producao/revisao-documentos/aprovados',
  DOCUMENTS_REJECTED: '/admin/producao/revisao-documentos/rejeitados',

  COMPLAINTS_PENDING: '/admin/producao/denuncias/pendentes',
  COMPLAINTS_APPROVED: '/admin/producao/denuncias/aprovadas',
  COMPLAINTS_REJECTED: '/admin/producao/denuncias/rejeitadas',

  INFRA: '/admin/infraestrutura',
};

export const ADMIN_COMPONENTS = {
  [ADMIN_ROUTES.ADMIN]: <Admin />,

  [ADMIN_ROUTES.FINANCIAL_RENEVUE]: <Renevue />,
  [ADMIN_ROUTES.FINANCIAL_TRANSACTIONS]: <Transactions />,
  [ADMIN_ROUTES.FINANCIAL_CHECKOUT]: <Checkout />,

  [ADMIN_ROUTES.REFUNDS_PENDING]: <RefundsPending />,
  [ADMIN_ROUTES.REFUNDS_APPROVED]: <RefundsApproved />,
  [ADMIN_ROUTES.REFUNDS_REJECTED]: <RefundsRejected />,

  [ADMIN_ROUTES.PRODUCTS_PENDING]: <ProductsPending />,
  [ADMIN_ROUTES.PRODUCTS_APPROVED]: <ProductsApproved />,
  [ADMIN_ROUTES.PRODUCTS_REJECTED]: <ProductsRejected />,

  [ADMIN_ROUTES.USERS_CONTROL]: <UsersControl />,
  [ADMIN_ROUTES.EMPLOYEES_CONTROL]: <EmployeesControl />,

  [ADMIN_ROUTES.DOCUMENTS_PENDING]: <DocumentsPending />,
  [ADMIN_ROUTES.DOCUMENTS_APPROVED]: <DocumentsApproved />,
  [ADMIN_ROUTES.DOCUMENTS_REJECTED]: <DocumentsRejected />,

  [ADMIN_ROUTES.COMPLAINTS_PENDING]: <ComplaintsPending />,
  [ADMIN_ROUTES.COMPLAINTS_APPROVED]: <ComplaintsApproved />,
  [ADMIN_ROUTES.COMPLAINTS_REJECTED]: <ComplaintsRejected />,

  [ADMIN_ROUTES.INFRA]: <Infra />,
};
