import { Module } from '@nestjs/common';
import { OtherController } from './other.controller';
import { OtherService } from './other.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { TokenGuard } from '~/lib/guards/token.guard'; 


@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '40m' }
      }),
      inject: [ConfigService]
    }),
  ],
  controllers: [OtherController],
  providers: [
    OtherService,
    {
      provide: 'TOKEN_GUARD',
      useClass: TokenGuard,
    },
  ],
  exports: [OtherService]
})
export class AuthModule { }
