import { ObjectType } from '@nestjs/graphql';
import { Status } from '~/enum';

@ObjectType()
export class Language {
  name: string;
  locale: string;
  image?: string;
  sort: number;
  status: Status;
}
