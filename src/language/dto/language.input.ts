import { InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

@InputType()
export class CreateLanguageInput {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly locale: string;

  @IsOptional()
  @IsUrl()
  readonly image?: string;

  @IsNumber()
  @IsOptional()
  readonly sort?: number;
}
