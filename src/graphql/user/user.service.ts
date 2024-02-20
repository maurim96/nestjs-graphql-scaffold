import { Clerk } from '@clerk/clerk-sdk-node';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider';
import * as schema from 'src/drizzle/schema';

@Injectable()
export class UserService {
  private clerk: ReturnType<typeof Clerk>;

  constructor(
    @Inject(DrizzleAsyncProvider) private db: NodePgDatabase<typeof schema>,
  ) {
    this.clerk = Clerk({ secretKey: process.env.CLERK_SECRET_KEY });
  }

  async findOne(userId: string) {
    const user = await this.db.query.users.findFirst({
      where: eq(schema.users.id, userId),
    });

    if (!user) {
      throw new NotFoundException(
        `[UserService] - User with id ${userId} not found`,
      );
    }

    return user;
  }

  async validateUserAndUpdateDeviceToken({
    userId,
    email,
    deviceToken,
  }: {
    userId: string;
    email: string;
    deviceToken: string;
  }) {
    const result = await this.db
      .insert(schema.users)
      .values({ id: userId, email, deviceToken })
      .onConflictDoUpdate({
        target: schema.users.id,
        set: { deviceToken },
      })
      .returning();

    if (result.length === 0) {
      throw new InternalServerErrorException(
        `[UserService] - Error upserting user ${userId}`,
      );
    }

    return result[0];
  }

  deleteUser({ userId, reason }: { userId: string; reason: string }) {
    return this.db
      .transaction(async () => {
        await this.db.delete(schema.users).where(eq(schema.users.id, userId));

        await this.db
          .insert(schema.userDeletionLogs)
          .values({
            userId: userId,
            reason,
          })
          .onConflictDoNothing();
      })
      .then(async () => await this.clerk.users.deleteUser(userId))
      .catch((error) => {
        throw new InternalServerErrorException(
          `[UserService] - Error deleting user ${userId}`,
          error,
        );
      });
  }
}
