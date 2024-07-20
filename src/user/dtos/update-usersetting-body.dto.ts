import { Prisma } from "@prisma/client"
import { IsOptional, IsBoolean } from "class-validator"

export class UpdateUserSettingBodyDto implements Prisma.UserSettingUpdateWithoutUserInput {
    @IsBoolean()
    @IsOptional()
    smsEnabled?: boolean

    @IsBoolean()
    @IsOptional()
    notificationsOn?: boolean
}