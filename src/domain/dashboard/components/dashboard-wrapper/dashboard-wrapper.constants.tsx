import { Dashboard } from '@domain/dashboard/dashboard.page';
import { MyProducts } from '@domain/dashboard/products/my-products/my-products.page';
import { Support } from '@domain/dashboard/support/support.page';
import { CreatedProducts } from '@domain/dashboard/products/created-products/created-products.page';
import { CreateProduct } from '@domain/dashboard/products/create-product/create-product.page';
import { ProductsOfAffiliates } from '@domain/dashboard/products/affiliates/products-of-affiliates';
import { SaleRecord } from '@domain/dashboard/sales/sale-record/sale-record.page';
import { CurrentBalance } from '@domain/dashboard/balance/current-balance/current.balance.page';
import { AccountStatements } from '@domain/dashboard/balance/account-statements';
import { Market } from '@domain/dashboard/market/market-page-index';
import { Recent } from '@domain/dashboard/market/components/recent/recent-component';
import { Subscriptions } from '@domain/dashboard/market/components/subscriptions/subscriptions.component';
import { EBooks } from '@domain/dashboard/market/components/ebook/ebook.component';
import { AffiliatesPage } from '@domain/dashboard/affiliates/affiliates.page';
import { TopCommissions } from '@domain/dashboard/market/components/top-commissions/top-commissions.component';
import { Payment } from '@domain/dashboard/paymet/paymet.component';
import { CreateProductWrapper } from '@domain/dashboard/products/create-product-wrapper/create-product-wrapper.page';
import { CreatePackage } from '@domain/dashboard/products/create-package/create-package.page';
import { MyContent } from '@domain/dashboard/products/my-content/my-content.page';
import { MyPackages } from '@domain/dashboard/products/my-content/my-packages/my-packages.page';
import { VideoClass } from '@domain/dashboard/products/video-class/video-class.page';

export const DASHBOARD_ROUTES = {
  DASHBOARD: '/dashboard',
  MY_PRODUCTS: '/dashboard/meus-produtos',
  SUPPORT: '/dashboard/suporte',
  CREATED_PRODUCTS: '/dashboard/meus-produtos/criados',
  CREATE_PRODUCT: '/dashboard/create',
  CREATE_COURSE: '/dashboard/create/course',
  CREATE_PACKAGE: '/dashboard/create/package',
  MY_CONTENT: '/dashboard/my-content',
  MY_PACKAGES: '/dashboard/my-content/my-packages',
  VIDEO_CLASS: '/dashboard/my-content/my-packages/my-class',
  PRODUCT_OF_AFFILIATES: '/dashboard/products-affiliates',
  SALE_RECORD: '/dashboard/registro-de-vendas',
  AFFILIATES: '/dashboard/afiliados',
  BALANCE: '/dashboard/saldo',
  EXTRACT_BALANCE: '/dashboard/saldo/extrato',
  MARKET: '/dashboard/mercado',
  MARKET_RECENT: '/dashboard/mercado/recentes',
  MARKET_COURSES: '/dashboard/mercado/cursos',
  MARKET_SUBSCRIPTIONS: '/dashboard/mercado/assinaturas',
  MARKET_EBOOKS: '/dashboard/mercado/ebooks',
  MARKET_TOPCOMMISSIONS: '/dashboard/mercado/top-comissoes',
  PAYMENT: '/payment/:productId',
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
    [DASHBOARD_ROUTES.MY_CONTENT]: <MyContent />,
    [DASHBOARD_ROUTES.MY_PACKAGES]: <MyPackages />,
    [DASHBOARD_ROUTES.SUPPORT]: <Support />,
    [DASHBOARD_ROUTES.CREATED_PRODUCTS]: <CreatedProducts />,
    [DASHBOARD_ROUTES.CREATE_COURSE]: <CreateProduct />,
    [DASHBOARD_ROUTES.CREATE_PACKAGE]: <CreatePackage />,
    [DASHBOARD_ROUTES.CREATE_PRODUCT]: <CreateProductWrapper />,
    [DASHBOARD_ROUTES.PRODUCT_OF_AFFILIATES]: <ProductsOfAffiliates />,
    [DASHBOARD_ROUTES.SALE_RECORD]: <SaleRecord />,
    [DASHBOARD_ROUTES.BALANCE]: <CurrentBalance />,
    [DASHBOARD_ROUTES.AFFILIATES]: <AffiliatesPage />,
    [DASHBOARD_ROUTES.EXTRACT_BALANCE]: <AccountStatements />,
    [DASHBOARD_ROUTES.MARKET]: <Market />,
    [DASHBOARD_ROUTES.MARKET_RECENT]: <Recent />,
    [DASHBOARD_ROUTES.MARKET_COURSES]: <Market />,
    [DASHBOARD_ROUTES.MARKET_SUBSCRIPTIONS]: <Subscriptions />,
    [DASHBOARD_ROUTES.MARKET_EBOOKS]: <EBooks />,
    [DASHBOARD_ROUTES.MARKET_TOPCOMMISSIONS]: <TopCommissions />,
    [DASHBOARD_ROUTES.PAYMENT]: <Payment />,
    [DASHBOARD_ROUTES.VIDEO_CLASS]: <VideoClass />,
  };

  return <>{components[route]}</>;
};
