import { Request, UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Public } from '~/auth/decorators/public.decorator';
import { Role } from '~/auth/decorators/role.decorator';
import { AuthGuard } from '~/auth/guard/auth.guard';
import { UpdatePasswordInput, UpdateUserInput, VerifyEmailInput } from '~/dto';
import { ReqAuth, User } from '~/entities';
import { RoleAuth } from '~/enum';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.userService.findAll({});
  }

  @UseGuards(AuthGuard)
  @Query(() => User)
  profile(@Request() req: ReqAuth) {
    this.userService.findOne({ id: req.userId });
  }

  @UseGuards(AuthGuard)
  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne({ id });
  }

  @UseGuards(AuthGuard)
  @Mutation(() => User)
  updatePassword(
    @Args('updatePasswordInput')
    updatePasswordInput: UpdatePasswordInput,
    @Request() req: ReqAuth,
  ) {
    return this.userService.updatePassword(req.userId, updatePasswordInput);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => User)
  sendMailOtp(@Request() req: ReqAuth) {
    return this.userService.sendMailOtp(req.userId);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => User)
  verifyEmail(
    @Request() req: ReqAuth,
    @Args('verifyEmailInput') verifyEmailInput: VerifyEmailInput,
  ) {
    return this.userService.verifyEmail(req.userId, verifyEmailInput.code);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => User)
  async updateUser(
    @Request() req: ReqAuth,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.userService.update({
      where: { id: req.userId },
      data: updateUserInput,
    });
  }

  @UseGuards(AuthGuard)
  @Role(RoleAuth.Admin)
  @Mutation(() => User)
  deleteUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove({ id });
  }
}
