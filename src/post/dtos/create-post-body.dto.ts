import { Prisma } from "@prisma/client";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePostBodyDto {
    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsString()
    description: string

    @IsNotEmpty()
    @IsNumber()
    userId: number
}