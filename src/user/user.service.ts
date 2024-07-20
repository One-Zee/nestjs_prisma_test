import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Http2ServerRequest } from 'http2';
import { PrismaService } from 'src/db_prisma/db_prisma.service';

@Injectable()
export class UserService {

    constructor( private readonly prismaService: PrismaService ){}

    async createUser( creatUserData: Prisma.UserCreateInput ) {
        const userSettingDefault = {
            smsEnabled: true,
            notificationsOn: false
        } 
        return this.prismaService.user.create({ data: {
            ...creatUserData,
            userSetting: {
                create: userSettingDefault
            }
        } })
    }

    async getUsers() {
        return this.prismaService.user.findMany({ include:{ userSetting: true, posts: true }})
    }

    async getUserById(id: number) {
       return this.prismaService.user.findUnique({ where: { id }, include: { userSetting: { select:{ smsEnabled: true, notificationsOn:true }}, posts: true}})
    }


    async updateUserById( id: number, data: Prisma.UserUpdateInput ){
        const findUser = await this.getUserById(id);
        if(!findUser) throw new HttpException('User not Found',404);

        if(data.username) {
            const findUser = await this.prismaService.user.findUnique({ 
                where: {
                    username: data.username as string
                }
            })
            if( findUser ) throw new HttpException('Username already taken',400)
        }

        return this.prismaService.user.update({ where: { id }, data });
    }

    // not Updating settings ?
    async updateUserSettingByUserId(id: number, data: Prisma.UserSettingUpdateInput ) {
        const findUser = await this.getUserById(id)
        if(!findUser) throw new HttpException('User not Found',404);
        if(!findUser.userSetting) throw new HttpException('Bad Request',400);

        return this.prismaService.userSetting.update({
            where:{
                userId: id
            },
            data
        })
    }

    async deleteUserById( id:number ) {
        const findUser = await this.prismaService.user.findUnique({ where: {id}});
        if(!findUser) throw new HttpException('User not found!!',404);

        return this.prismaService.user.delete({where:{id}})
    }
}
