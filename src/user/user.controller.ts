import { Body, Controller, Delete, Get, HttpException, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserBodyDto } from './dtos/update-user-body.dto';
import { UpdateUserSettingBodyDto } from './dtos/update-usersetting-body.dto';

@Controller('user')
export class UserController {
    constructor( private readonly userService: UserService ) {}

    @Post('')
    async createUser(@Body() createuserDto: CreateUserDto ) {
        return this.userService.createUser(createuserDto)
    }

    @Get('')
    async getUsers() {
        return this.userService.getUsers()
    }

    @Get(':id')
    async getUserById(@Param('id', ParseIntPipe) id: number ) {
        const user = await this.userService.getUserById(id);
        if(!user) throw new HttpException('User not found!!',404);
        return user
    }

    @Patch(':id')
    async updateUserById(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserBodyDto: UpdateUserBodyDto
    ){
        return this.userService.updateUserById(id, updateUserBodyDto );
    }

    @Patch('settings')
    async updateUserSettingByUserId(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserSettingBodyDto: UpdateUserSettingBodyDto
    ){
        return this.userService.updateUserSettingByUserId(id, updateUserSettingBodyDto );
    }

    @Delete(':id')
    async deleteUserById(@Param('id', ParseIntPipe) id: number ) {
        return this.userService.deleteUserById(id)
    }
}
