import { Module } from '@nestjs/common';
import { ClerkAuthGraphqlGuard } from './clerk-auth.graphql.guard';
import { ClerkAuthGuard } from './clerk-auth.guard';

@Module({
  providers: [ClerkAuthGraphqlGuard, ClerkAuthGuard],
})
export class AuthModule {}
