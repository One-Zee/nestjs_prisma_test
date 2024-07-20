import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/db_prisma/db_prisma.service';
import { UserService } from 'src/user/user.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PostService {
    constructor(
        private readonly databaseService: PrismaService,
        private readonly userService: UserService
    ){}

    async createPost(userId:number,  post: Prisma.PostCreateWithoutUserInput ){
        const user = await this.userService.getUserById(userId);
        if(!user) throw new NotFoundException("User Not Found")
        return this.databaseService.post.create({
            data: {
                ...post,
                userId
            }
        })
    }


    async createGroupPost(userIds:number[],  post: Prisma.GroupPostCreateWithoutUsersInput ){
        //const user = await this.userService.getUserById(userId); 
        //if(!user) throw new NotFoundException("User Not Found")
        return this.databaseService.groupPost.create({
            data: {
                ...post,
                Users: {
                    create: userIds.map(userId => ( {userId}))
                }
            }
        })
    }

    async getGroupPosts(){
        return this.databaseService.groupPost.findMany({
            include:{ Users: {
                select: {
                    user: true
                }
            } }
        })
    }
}
