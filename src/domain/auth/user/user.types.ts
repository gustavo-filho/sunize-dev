export interface UserAuthProps {
  email: string;
  password: string;
  code?: string;
  access_token?: string;
  by_pass?: boolean;
}

export interface UserApiResponse {
  data: {};
}
