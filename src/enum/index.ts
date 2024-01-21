export * from '~/enum/auth.enum';
export * from '~/enum/email.enum';
import { registerEnumType } from '@nestjs/graphql';

export enum Status {
  Delete = 'delete',
  Active = 'active',
}
registerEnumType(Status, {
  name: 'Status',
  description: 'status global',
});
