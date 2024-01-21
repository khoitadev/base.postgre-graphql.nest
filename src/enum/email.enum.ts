import { registerEnumType } from '@nestjs/graphql';

export enum TypeOtp {
  ForgotPassword = 'forgot-password',
  ResetPassword = 'reset-password',
  VerifyEmail = 'verify-email',
}

export enum MailKeyword {
  ForgotPassword = 'forgot-password',
  ResetPassword = 'reset-password',
  Verify = 'verify-email',
}
registerEnumType(MailKeyword, {
  name: 'MailKeyword',
  description: 'keyword email',
});

export enum StatusGeneratorOtp {
  New = 'new',
  Exist = 'exist',
}
