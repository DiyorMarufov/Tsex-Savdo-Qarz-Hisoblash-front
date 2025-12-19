export interface IAuthUser {
  phone_number: string;
  password: string;
}

export interface IResponseData {
  statusCode: number;
  message: string;
  data: any[];
}

export interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  shopId?: string;
  tsexId?: string;
  region?: string;
}

export interface TsexTransactionsType {
  partial_payment: string;
  payment: string;
  avans: string;
  product_supply: string;
}

export interface Option {
  value: string;
  label: string;
}
