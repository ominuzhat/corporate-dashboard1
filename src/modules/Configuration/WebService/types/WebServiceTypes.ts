export type TWebServiceDataTypes = {
  id: number;
  serviceId?: string;
  name?: string;
  description?: string;
  url?: string;
};

export type TCreateWebServiceTypes = {
  name?: string;
  description?: string;
  url?: string;
  webService?: number;
};
