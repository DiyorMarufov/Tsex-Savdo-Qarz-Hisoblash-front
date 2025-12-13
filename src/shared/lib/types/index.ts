export interface IAuthUser {
  phone_number: string;
  password: string;
}

export interface IResponseData {
  statusCode: number;
  message: string;
  data: any[];
}
