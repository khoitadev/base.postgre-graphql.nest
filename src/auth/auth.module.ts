import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AdminModule } from '~/admin/admin.module';
import { AuthResolver } from '~/auth/auth.resolver';
import { AuthService } from '~/auth/auth.service';

@Global()
@Module({
  imports: [
    AdminModule,
    JwtModule.register({
      global: true,
    }),
  ],
  providers: [AuthService, AuthResolver],
  exports: [AuthService],
})
export class AuthModule {}
