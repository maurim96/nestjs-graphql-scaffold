import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from './user.model';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { ClerkAuthGuard } from 'src/auth/clerk-auth.guard';
import {
  GetUserCredentials,
  UserCredentials,
} from 'src/auth/get-user-credentials.decorator';
import { LoggerService } from 'src/logger/logger.service';

@Resolver(() => User)
@UseGuards(ClerkAuthGuard)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly logger: LoggerService,
  ) {}

  @Query(() => User)
  async me(
    @GetUserCredentials() userCredentials: UserCredentials,
  ): Promise<User> {
    try {
      const user = await this.userService.findOne(userCredentials.id);

      return user;
    } catch (error) {
      this.logger.error(
        `[UserResolver] - Error fetching current user - User: ${userCredentials.id}`,
      );
      throw error;
    }
  }

  @Mutation(() => User)
  async validateUserAndUpdateDeviceToken(
    @Args('deviceToken') deviceToken: string,
    @GetUserCredentials() userCredentials: UserCredentials,
  ): Promise<User> {
    try {
      const user = await this.userService.validateUserAndUpdateDeviceToken({
        email: userCredentials.email,
        userId: userCredentials.id,
        deviceToken: deviceToken,
      });

      return user;
    } catch (error) {
      this.logger.error(
        `[UserResolver] - Error upserting user - User: ${userCredentials.id}`,
      );
      throw error;
    }
  }

  @Mutation(() => Boolean)
  async deleteUser(
    @Args('reason') reason: string,
    @GetUserCredentials() userCredentials: UserCredentials,
  ): Promise<boolean> {
    try {
      this.logger.log(
        `[UserResolver] - Started user deletion - User: ${userCredentials.id} - Email: ${userCredentials.email}`,
      );

      await this.userService.deleteUser({
        userId: userCredentials.id,
        reason: reason,
      });

      this.logger.log(
        `[UserResolver] - User deleted succesfully - User: ${userCredentials.id} - Email: ${userCredentials.email}`,
      );

      return true;
    } catch (error) {
      this.logger.error(
        `[UserResolver] - Error on deleting user - User: ${userCredentials.id} - Email: ${userCredentials.email}`,
      );
      throw error;
    }
  }
}
