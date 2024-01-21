import { InputType, PartialType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsString()
  @MinLength(10)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsUrl()
  avatar?: string;

  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @IsString()
  @IsNotEmpty()
  language?: string;

  @IsString()
  @IsNotEmpty()
  typeLogin?: string;

  @IsString()
  @IsNotEmpty()
  uid?: string;

  @IsString()
  @IsNotEmpty()
  status?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  countryCode?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  ip?: string;
}

@InputType()
export class ResetPasswordInput extends PartialType(
  CreateUserInput,
  InputType,
) {
  @IsString()
  @MinLength(6)
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  code: string;
}

@InputType()
export class UpdatePasswordInput {
  @IsString()
  @MinLength(6)
  oldPassword: string;

  @IsString()
  @MinLength(6)
  newPassword: string;
}

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  id: number;

  @IsOptional()
  @IsString()
  @MinLength(10)
  name: string;

  @IsOptional()
  @IsUrl()
  avatar?: string;

  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  language: string;
}

@InputType()
export class VerifyEmailInput {
  @IsString()
  @MinLength(6)
  code: string;
}
