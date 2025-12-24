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
  role?: string;
  status?: string;
  region?: string;
  startDate?: string;
  endDate?: string;
}

export interface TsexTransactionsType {
  partial_payment: string;
  payment: string;
  avans: string;
  product_supply: string;
}

export interface Option {
  value: any;
  label: any;
}

export type TransactionFieldType = {
  customer_id: string;
  amount: any;
  due_date?: Date;
  description?: string;
};

export type NewCustomerFieldType = {
  full_name: string;
  phone_number: string;
  region: string;
};

export type CustomerTransactionDetailType =
  | "lend-more"
  | "receive"
  | "borrow-more"
  | "repayment";

export interface CustomerTransactionDetailDataType {
  transaction_id: string;
  amount: any;
  description?: string;
}

export type UserFieldType = {
  full_name: string;
  phone_number: string;
  password: string;
  role: "admin" | "tsex_manager";
};
