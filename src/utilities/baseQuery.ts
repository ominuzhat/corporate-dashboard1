const isDevelopment: boolean = process.env.NODE_ENV === "development";

const productionUrl: string =
  "https://api.codecanvascreation.com";

const localUrl: string = "https://api.codecanvascreation.com";

export const baseUrl: string = isDevelopment ? localUrl : productionUrl;

export const TOKEN_NAME: string = "access-token";
