import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLUpload } from 'graphql-upload-ts';
import path from 'path';
import { AdminModule } from '~/admin/admin.module';
import { AppService } from '~/app.service';
import { AuthModule } from '~/auth/auth.module';
import { AuthService } from '~/auth/auth.service';
import { AuthGuard } from '~/auth/guard/auth.guard';
import { CommonModule } from '~/common/common.module';
import { FileModule } from '~/file/file.module';
import { FileService } from '~/file/file.service';
import { LanguageModule } from '~/language/language.module';
import { LanguageService } from '~/language/language.service';
import { PrismaModule } from '~/prisma/prisma.module';
import { UserModule } from '~/user/user.module';
import { AdminService } from './admin/admin.service';
import { EmailModule } from './email/email.module';
import { FileController } from './file/file.controller';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      resolvers: { Upload: GraphQLUpload },
      driver: ApolloDriver,
      autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      buildSchemaOptions: {
        numberScalarMode: 'integer',
      },
      // transformSchema: schema => upperDirectiveTransformer(schema, 'upper'),
      // installSubscriptionHandlers: true,
      // subscriptions: {
      //   'graphql-ws': true,
      // },
      // buildSchemaOptions: {
      //   directives: [
      //     new GraphQLDirective({
      //       name: 'upper',
      //       locations: [DirectiveLocation.FIELD_DEFINITION],
      //     }),
      //   ],
      // },
    }),
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    LanguageModule,
    AuthModule,
    FileModule,
    EmailModule,
    PrismaModule,
    CommonModule,
    UserModule,
    AdminModule,
  ],
  controllers: [FileController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AppService,
    AuthService,
    AdminService,
    LanguageService,
    FileService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('language');
  }
}
