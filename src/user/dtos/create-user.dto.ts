import { Prisma } from "@prisma/client";
import { IsNotEmpty, IsOptional, isString, IsString } from "class-validator";

export class CreateUserDto implements Prisma.UserCreateWithoutUserSettingInput {

    @IsString()
    @IsNotEmpty()
    username: string

    @IsString()
    @IsOptional()
    displayName?: string
}