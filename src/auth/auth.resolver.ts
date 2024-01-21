import { Request } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from '~/auth/auth.service';
import { Public } from '~/auth/decorators/public.decorator';
import {
  LoginInput,
  LoginSocialInput,
  RefreshTokenInput,
  RegisterInput,
  ResetPasswordInput,
} from '~/dto';
import { Admin, ReqRegister } from '~/entities';
import { User } from '~/user/entities/user.entity';
import { UserService } from '~/user/user.service';

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Public()
  @Mutation(() => User)
  forgotPassword(
    @Args('forgotPasswordInput') resetPasswordInput: ResetPasswordInput,
  ) {
    return this.authService.forgotPassword(resetPasswordInput);
  }

  @Public()
  @Mutation(() => User)
  resetPassword(
    @Args('resetPasswordInput') resetPasswordInput: ResetPasswordInput,
  ) {
    return this.userService.resetPassword(resetPasswordInput);
  }

  @Public()
  @Mutation(() => User)
  register(
    @Request() req: ReqRegister,
    @Args('registerInput') registerInput: RegisterInput,
  ) {
    return this.authService.register(req, registerInput);
  }

  @Public()
  @Mutation(() => User)
  login(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }

  @Public()
  @Mutation(() => User)
  loginGoogle(
    @Request() req: ReqRegister,
    @Args('loginGoogleInput') loginSocialInput: LoginSocialInput,
  ) {
    return this.authService.loginGoogle(req, loginSocialInput.accessToken);
  }

  @Public()
  @Mutation(() => User)
  loginFaceBook(
    @Request() req: ReqRegister,
    @Args('loginFaceBookInput') loginSocialInput: LoginSocialInput,
  ) {
    return this.authService.loginFacebook(req, loginSocialInput.accessToken);
  }

  @Public()
  @Mutation(() => Admin)
  adminLogin(@Args('adminLoginInput') loginInput: LoginInput) {
    return this.authService.adminLogin(loginInput);
  }

  @Public()
  @Mutation(() => User)
  refreshToken(
    @Args('refreshTokenInput') refreshTokenInput: RefreshTokenInput,
  ) {
    return this.authService.refreshToken(refreshTokenInput.refreshToken);
  }
}
