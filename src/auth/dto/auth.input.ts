import { InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsJWT,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

@InputType()
export class LoginInput {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @MinLength(6)
  readonly password: string;
}

@InputType()
export class RegisterInput {
  @IsString()
  @MinLength(10)
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @MinLength(6)
  readonly password: string;
}

@InputType()
export class ForgotPasswordInput {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
}

@InputType()
export class LoginSocialInput {
  @IsString()
  @IsNotEmpty()
  readonly accessToken: string;
}

@InputType()
export class RefreshTokenInput {
  @IsJWT()
  readonly refreshToken: string;
}
