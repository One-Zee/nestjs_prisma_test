import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PrismaModule } from 'src/db_prisma/db_prisma.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[PrismaModule,UserModule],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
