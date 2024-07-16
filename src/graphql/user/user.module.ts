import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { drizzleProvider } from 'src/drizzle/drizzle.provider';
// import { LoggerService } from 'src/logger/logger.service';

@Module({
  providers: [
    UserService,
    UserResolver,
    ...drizzleProvider,
    // LoggerService
  ],
})
export class UserModule {}
