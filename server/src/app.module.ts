import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { ResponseInterceptor } from './lib/interceptors/success.interceptor';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './envalid'
import { ExceptionsFilter } from './lib/filters/exception.filter';
import { MinioModule } from './modules/minio/minio.module';
import { AuthModule } from './modules/other/other.module';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validate
    }),
    NestjsFormDataModule.config({
      isGlobal: true
    }),
    MinioModule,
    AuthModule
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: ExceptionsFilter
    }
  ]
})
export class AppModule { }
