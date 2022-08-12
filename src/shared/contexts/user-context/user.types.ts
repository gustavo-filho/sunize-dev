import { Purcharse } from '@domain/admin/production/users-control/components/modal/modal.types';
import { Product } from '@shared/types/types';

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  cnpj: string;
  birthday: string | null;
  products: Product[];
  purcharses: Purcharse[];
  affiliates: any[];
  account_type: string;
  blocked_access: boolean;
  taxProducer?: number;
  taxInviting?: number;
  access_token: string;
  photo: string;
}
export interface UserAuthProps {
  email: string;
  password: string;
}

export interface UserAuthResponse {
  success: boolean;
  tfa_required: boolean;
  data: User;
}

export interface UserRegisterProps {
  email: string;
  password: string;
}

export interface UserRegisterResponse {
  success: boolean;
  tfa_required: boolean;
  data: User;
}

export interface UserApiResponse {
  data: {};
}
