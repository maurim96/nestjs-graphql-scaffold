import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import validateEnv from './config/env';
import { AuthModule } from './auth/auth.module';
import { DrizzleModule } from './drizzle/drizzle.module';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './graphql/user/user.module';
import { PostModule } from './rest/post/post.module';
// import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validateEnv,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      sortSchema: true,
      autoSchemaFile: 'schema.gql',
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    AuthModule,
    DrizzleModule,
    UserModule,
    PostModule,
    // Deactivated LoggerModule for simplicty
    // LoggerModule,
  ],
})
export class AppModule {}
