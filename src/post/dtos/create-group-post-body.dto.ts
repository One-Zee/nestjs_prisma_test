import { Prisma } from "@prisma/client";
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateGroupPostBodyDto  {
    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsString()
    description: string

    @ArrayNotEmpty()
    @IsArray()
    @IsNumber({},{ each: true })

    userIds: number[]
}