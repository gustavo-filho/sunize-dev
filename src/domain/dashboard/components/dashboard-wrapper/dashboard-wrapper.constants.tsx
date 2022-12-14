import { DocumentsPage } from '@domain/dashboard/account/edit-account/documents/documents.page';
import { PersonInvitesPage } from '@domain/dashboard/account/edit-account/invites/invites.page';
import { PersonNotificationPage } from '@domain/dashboard/account/edit-account/notification/notification.page';
import { PersonPage } from '@domain/dashboard/account/edit-account/person-data/person-data.page';
import { AffiliatesPage } from '@domain/dashboard/affiliates/affiliates.page';
import { AccountStatements } from '@domain/dashboard/balance/account-statements';
import { CurrentBalance } from '@domain/dashboard/balance/current-balance/current.balance.page';
import { Dashboard } from '@domain/dashboard/dashboard.page';
import { Market } from '@domain/dashboard/market/market-page-index';
import { ProductsOfAffiliates } from '@domain/dashboard/products/affiliates/products-of-affiliates';
import { CreatePackage } from '@domain/dashboard/products/create-package/create-package.page';
import { CreateProductWrapper } from '@domain/dashboard/products/create-product-wrapper/create-product-wrapper.page';
import { CreateProduct } from '@domain/dashboard/products/create-product/create-product.page';
import { CreatedProducts } from '@domain/dashboard/products/created-products/created-products.page';
import { GeneralAffiliatesPage } from '@domain/dashboard/products/general-affiliates/general-affiliates.page';
import { GeneralCheckoutPage } from '@domain/dashboard/products/general-checkout/general-checkout.page';
import { CoProductionPage } from '@domain/dashboard/products/general-coprodution/general-coproduction.page';
import { GeneralInformationPage } from '@domain/dashboard/products/general-information/general-information.page';
import { GeneralLinksPage } from '@domain/dashboard/products/general-links/general-links.page';
import { GeneralPixelPage } from '@domain/dashboard/products/general-pixel/general-pixel.page';
import { GeneralVouchersPage } from '@domain/dashboard/products/general-vouchers/general-vouchers.page';
import { MyContent } from '@domain/dashboard/products/my-content/my-content.page';
import { MyPackages } from '@domain/dashboard/products/my-content/my-packages/my-packages.page';
import { MyProducts } from '@domain/dashboard/products/my-products/my-products.page';
import { VideoClass } from '@domain/dashboard/products/video-class/video-class.page';
import { SaleRecord } from '@domain/dashboard/sales/sale-record/sale-record.page';
import { Support } from '@domain/dashboard/support/support.page';

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
  MARKET: '/dashboard/mercado/*',
  ACCOUNT_INFO: '/dashboard/edit-account/person-data',
  ACCOUNT_INVITES: '/dashboard/edit-account/invites',
  ACCOUNT_NOTIFICATIONS: '/dashboard/edit-account/notification',
  ACCOUNT_DOCUMENTS: '/dashboard/edit-account/documents',
  GENERAL_INFORMATION: '/dashboard/informacoes-gerais/manage/:id',
  GENERAL_CHECKOUT: '/dashboard/informacoes-gerais/checkout/:id',
  GENERAL_COPRODUCTION: '/dashboard/informacoes-gerais/coproduction/:id',
  GENERAL_LINKS: '/dashboard/informacoes-gerais/links/:id',
  GENERAL_VOUCHERS: '/dashboard/informacoes-gerais/vouchers/:id',
  GENERAL_AFFILIATES: '/dashboard/informacoes-gerais/affiliates/:id',
  GENERAL_PIXEL: '/dashboard/informacoes-gerais/pixel/:id',
};

export const DASHBOARD_COMPONENTS: { [key: string]: JSX.Element } = {
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
  [DASHBOARD_ROUTES.GENERAL_INFORMATION]: <GeneralInformationPage />,
  [DASHBOARD_ROUTES.GENERAL_CHECKOUT]: <GeneralCheckoutPage />,
  [DASHBOARD_ROUTES.GENERAL_COPRODUCTION]: <CoProductionPage />,
  [DASHBOARD_ROUTES.GENERAL_VOUCHERS]: <GeneralVouchersPage />,
  [DASHBOARD_ROUTES.GENERAL_LINKS]: <GeneralLinksPage />,
  [DASHBOARD_ROUTES.GENERAL_AFFILIATES]: <GeneralAffiliatesPage />,
  [DASHBOARD_ROUTES.GENERAL_PIXEL]: <GeneralPixelPage />,
  [DASHBOARD_ROUTES.SALE_RECORD]: <SaleRecord />,
  [DASHBOARD_ROUTES.BALANCE]: <CurrentBalance />,
  [DASHBOARD_ROUTES.AFFILIATES]: <AffiliatesPage />,
  [DASHBOARD_ROUTES.EXTRACT_BALANCE]: <AccountStatements />,
  [DASHBOARD_ROUTES.MARKET]: <Market />,
  [DASHBOARD_ROUTES.VIDEO_CLASS]: <VideoClass />,
  [DASHBOARD_ROUTES.ACCOUNT_INFO]: <PersonPage />,
  [DASHBOARD_ROUTES.ACCOUNT_INVITES]: <PersonInvitesPage />,
  [DASHBOARD_ROUTES.ACCOUNT_NOTIFICATIONS]: <PersonNotificationPage />,
  [DASHBOARD_ROUTES.ACCOUNT_DOCUMENTS]: <DocumentsPage />,
};
