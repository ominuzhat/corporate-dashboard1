export type TKmsDataTypes = {
  id: number;
  clientId: string;
  apiKey?: string;
  expiresAt?: Date;
  createdAt?: Date;
  expirationDays?: any;
};

export type TCreateKmsTypes = {
  id?: number;
  clientId: string;
  expirationDays?: number;
};

export type TUpdateKmsTypes = {
  id?: number;
  clientId?: string;
  expirationDays?: number;
};
