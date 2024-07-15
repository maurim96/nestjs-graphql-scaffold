import { Module } from '@nestjs/common';
// import { LoggerModule } from 'src/logger/logger.module';
import { drizzleProvider } from 'src/drizzle/drizzle.provider';
import { PostService } from './post.service';
import { PostController } from './post.controller';

@Module({
  //   imports: [LoggerModule],
  controllers: [PostController],
  providers: [PostService, ...drizzleProvider],
})
export class PostModule {}
