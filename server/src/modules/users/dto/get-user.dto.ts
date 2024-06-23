import { Transform } from "class-transformer";
import { IsInt } from "class-validator";

export class GetUserDto {
    @Transform(({ value }) => parseInt(value))
    @IsInt()
    userId: number;
}