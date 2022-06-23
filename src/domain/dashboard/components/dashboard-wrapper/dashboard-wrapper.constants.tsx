import { Dashboard } from '@domain/dashboard/dashboard.page';
import { MyProducts } from '@domain/dashboard/products/my-products/my-products.page';
import { Support } from '@domain/dashboard/support/support.page';
import { CreatedProducts } from '@domain/dashboard/products/created-products/created-products.page';
import { CreateProduct } from '@domain/dashboard/products/create-product/create-product.page';
import { Affiliates } from '@domain/dashboard/products/affiliates/affiliates.page';
import { SaleRecord } from '@domain/dashboard/sales/sale-record/sale-record.page';
import { PurchaseRecordPage } from '@domain/dashboard/sales/purchase-record/purchase-record.page';
import { CurrentBalance } from '@domain/dashboard/balance/current-balance/current.balance.page';

export const DASHBOARD_ROUTES = {
  DASHBOARD: '/dashboard',
  MY_PRODUCTS: '/dashboard/meus-produtos',
  SUPPORT: '/dashboard/suporte',
  CREATED_PRODUCTS: '/dashboard/meus-produtos/criados',
  CREATE_PRODUCT: '/dashboard/create/course',
  PRODUCT_OF_AFFILIATES: '/dashboard/products-affiliates',
  SALE_RECORD: '/dashboard/registro-de-vendas',
  PURCHASE_RECORD: '/dashboard/registro-de-compras',
  BALANCE: '/dashboard/saldo',
};

interface DashboardWrapperConstantsProps {
  route: string;
}

export const DashboardWrapperConstants = ({
  route,
}: DashboardWrapperConstantsProps) => {
  const components: { [key: string]: JSX.Element } = {
    [DASHBOARD_ROUTES.DASHBOARD]: <Dashboard />,
    [DASHBOARD_ROUTES.MY_PRODUCTS]: <MyProducts />,
    [DASHBOARD_ROUTES.SUPPORT]: <Support />,
    [DASHBOARD_ROUTES.CREATED_PRODUCTS]: <CreatedProducts />,
    [DASHBOARD_ROUTES.CREATE_PRODUCT]: <CreateProduct />,
    [DASHBOARD_ROUTES.PRODUCT_OF_AFFILIATES]: <Affiliates />,
    [DASHBOARD_ROUTES.SALE_RECORD]: <SaleRecord />,
    [DASHBOARD_ROUTES.PURCHASE_RECORD]: <PurchaseRecordPage />,
    [DASHBOARD_ROUTES.BALANCE]: <CurrentBalance />,
  };

  return <>{components[route]}</>;
};
