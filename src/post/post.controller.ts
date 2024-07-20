import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePostBodyDto } from './dtos/create-post-body.dto';
import { PostService } from './post.service';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { CreateGroupPostBodyDto } from './dtos/create-group-post-body.dto';

@Controller('post')
export class PostController {

    constructor(
        private readonly postService: PostService
    ) {}

    @Post('')
    async createPost(
        @Body() createPostBodyDto: CreatePostBodyDto
    ) {
        const {userId, ...rest } = createPostBodyDto
        return this.postService.createPost(userId,rest);
    }


    @Post('group')
    async createGroupPost(
        @Body() createGroupPostBodyDto: CreateGroupPostBodyDto
    ) {
        const {userIds, ...rest } = createGroupPostBodyDto
        return this.postService.createGroupPost(userIds,rest);
    }


    @Get('group')
    async getGroupPosts() {
        return this.postService.getGroupPosts();
    }
}
