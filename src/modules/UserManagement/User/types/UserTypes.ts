export enum EGender {
  Male = "Male",
  Female = "Female",
}

export type TSimpleRole = {
  id: number;
  name: string;
};

export type TUserDetail = {
  id: number;
  phone: string;
  address: string;
  gender: EGender;
  image?: string;
};

export type TUserDataTypes = {
  id?: number;
  firstName?: string;
  lastName?: string;
  status?: boolean;
  clientId?: string;
  email?: string;
  details?: TUserDetail;
  role?: TSimpleRole;
};

export type TCreateUserTypes = {
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
  phone?: string;
  address?: string;
  gender: EGender;
  role: number;
  image?: string;
};

export type TUpdateUserTypes = {
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  gender?: EGender;
  role?: number;
  image?: string;
};
