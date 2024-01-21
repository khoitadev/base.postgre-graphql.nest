import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  id: number;
  email: string;
  name: string;
  password: string;
  avatar?: string;
  phone?: string;
  emailVerified: string;
  language: string;
  typeLogin?: string;
  uid?: string;
  countryCode?: string;
  ip?: string;
  status: string;
}

export interface UpdateInfoSocial {
  typeLogin?: string;
  uid?: string;
  name?: string;
}
