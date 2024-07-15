import { Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from 'src/drizzle/schema';
import { Inject } from '@nestjs/common';
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider';
import { CreatePostDTO } from './dto/CreatePostDTO';
// import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class PostService {
  constructor(
    @Inject(DrizzleAsyncProvider) private db: NodePgDatabase<typeof schema>,
    // private readonly logger: LoggerService,
  ) {}

  /**
   * Retrieves notifications for a specific user from the last 30 days.
   *
   * @param userId - The ID of the user for whom notifications are being fetched.
   * @returns An array of recent notifications for the specified user.
   */
  async createPost(userId: string, createPostDTO: CreatePostDTO) {
    // this.logger.log(
    //   `[PostService] - loremp ipsum`,
    // );
    return { ...createPostDTO, userId };
  }
}
