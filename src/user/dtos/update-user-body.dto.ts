import { Prisma } from "@prisma/client"
import { IsString, IsOptional } from "class-validator"

export class UpdateUserBodyDto implements Prisma.UserUpdateWithoutUserSettingInput{
    @IsString()
    @IsOptional()
    username?: string

    @IsString()
    @IsOptional()
    displayName?: string
}