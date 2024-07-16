import { Controller, Post, Body, UseGuards } from '@nestjs/common';
// import { LoggerService } from 'src/logger/logger.service';
import { CreatePostDTO } from './dto/CreatePostDTO';
import { PostService } from './post.service';
import {
  GetUserCredentialsFromHttp,
  UserCredentials,
} from 'src/auth/get-user-credentials.decorator';
import { ClerkAuthGuard } from 'src/auth/clerk-auth.guard';

@Controller('post')
@UseGuards(ClerkAuthGuard)
export class PostController {
  constructor(
    private readonly postService: PostService,
    // private readonly logger: LoggerService,
  ) {}

  @Post('create')
  async createPost(
    @GetUserCredentialsFromHttp() userCredentials: UserCredentials,
    @Body() createPostDTO: CreatePostDTO,
  ): Promise<any> {
    try {
      const result = await this.postService.createPost(
        userCredentials.id,
        createPostDTO,
      );
      return {
        data: result,
        message: 'Post created',
      };
    } catch (error) {
      //   this.logger.error(
      //     `[ScheduledNotifications] - Failed sending notification - Title: ${sendNotificationDto.title} - ${error}`,
      //   );
      return {
        message: 'Failed creating the post',
      };
    }
  }
}
