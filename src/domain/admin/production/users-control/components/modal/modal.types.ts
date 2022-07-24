import { Dispatch, SetStateAction } from 'react';

export interface Product {
  id: number;
  title: string;
  image: string;
  createdAt: string;
}

export interface Purcharse {
  id: number;
  title: string;
  image: string;
  createdAt: string;
}

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
}

export interface UserData {
  account_type: string;
  user: User;
  sales: number;
  profit: number;
}

export interface ModalProps {
  personId: number;
  setModal: Dispatch<SetStateAction<boolean>>;
}
