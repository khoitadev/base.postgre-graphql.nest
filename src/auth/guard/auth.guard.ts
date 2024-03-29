import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from '~/auth/decorators/public.decorator';
import { ROLES_KEY } from '~/auth/decorators/role.decorator';
import { RoleAuth } from '~/enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('🚀 ~ AuthGuard ~ canActivate ~ context:', context);
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const requiredRoles = this.reflector.getAllAndOverride<RoleAuth[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    const request: any = this.getRequest(context);
    request.clientIp = request.headers['cf-connecting-ip'];
    request.clientCountry = request.headers['cf-ipcountry'];

    if (isPublic) {
      return true;
    }

    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET_TOKEN,
      });
      if (requiredRoles) {
        return requiredRoles.some((role) => payload.role?.includes(role));
      }

      request.user = payload;
      request.userId = payload.id;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
    return true;
  }

  private getRequest(context: ExecutionContext): Request {
    if (context.getType() === 'http') {
      return context.switchToHttp().getRequest<Request>();
    } else {
      const ctx = GqlExecutionContext.create(context);
      return ctx.getContext().req;
    }
    throw new Error('Unsupported context type');
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
