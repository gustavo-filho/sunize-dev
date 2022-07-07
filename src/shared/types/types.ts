export interface CustomCheckoutData {
  options_pay: [string];
  affiliate_id: number;
  alert_text: {
    allowed: boolean;
  };
  sale_permission: {
    allowed: boolean;
  };
  identify_gender: [any];
  allow_time: {
    allowed: boolean;
    time?: number;
  };
  allow_random_message: {
    allowed: boolean;
    time?: number;
  };
  allow_warnings: {
    allowed: boolean;
    qtd_people: number;
  };
  allow_orderbump: {
    allowed: boolean;
    product?: string;
  };
  color_header: {
    allowed: true;
    color?: string;
  };
  background_color: {
    allowed: true;
    color?: string;
  };
  message_whatsapp: string | null;
  page_purchase: {
    url?: string;
    message?: string;
  };
  allow_popup: {
    allowed: boolean;
    type_of_discount?: {
      discount: number;
    };
  };
  phone: {
    allowed: boolean;
    text?: string;
    phone_number?: string;
  };
  need_type_gender: boolean;
  abandoned_purchases_voucher: {
    allowed: boolean;
    message?: 'compre comigo';
  };
  notifications: {
    people_buy_product_in_few_minutes: {
      allowed: boolean;
    };
    people_buy_product_in_last_hour: {
      allowed: boolean;
    };
    people_buy_product_incrible: {
      allowed: boolean;
    };
    people_buy_product_moment: {
      allowed: boolean;
    };
    people_buy_product_week: {
      allowed: boolean;
    };
    people_just_bought_product: {
      allowed: boolean;
    };
    people_buy_product_today: {
      allowed: boolean;
      text?: string;
      qtd_max?: number;
    };
  };
  owner_id: number;
  product_allow: boolean;
  product_id: number;
  subtitle_text: {
    allowed: boolean;
  };
  text_product_allow: string | null;
  title_text: { allowed: boolean };
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  User: { name: string };
  affiliate_can_sell: boolean;
  membership_period: string;
  owner_id: string;
  categories: [];
  charge_type: 'RECURRENT' | 'ONE_TIME';
  checkout: [
    {
      product_allow: boolean;
    },
  ];
  system_affiliate: boolean;
  commission: number;
  createdAt: string;
  currency: string;
  description: string;
  evaluates: [];
  evaluation: null;
  id: number;
  image: string;
  isCommentDisabled: boolean;
  logo: null;
  price: number;
  product_type: 'EBOOK' | 'ONLINE_COURSE';
  link_sales: string;
  rejectionReason: string;
  sale_disabled: boolean;
  status: 'APPROVED' | 'REPROVED';
  title: string;
}

export interface SalesReport {
  boletos?: {
    boletos_gerado: number;
    boletos_vendido: number;
    conversion: null | number;
  };
  chargeback?: {
    chargesback: number;
    porcent_chargesback: null | number;
    total: number;
  };
  click?: number;
  sales?: number;
  total?: number;
  products?: [any];
  infos: boolean;
}

export interface GoalData {
  name: string;
  qtd_sales: number;
  type: string;
  comission: number;
  id: string;
  deleted: boolean;
}

export interface VoucherData {
  discount_percentage: number;
  discount_fixed: number;
  code: string;
  deadline: string;
  id: string;
  type_discount: string;
}
export interface IPixData {
  url: string;
  key: string;
  statusMessage: string;
  statusDescription: string;
}
