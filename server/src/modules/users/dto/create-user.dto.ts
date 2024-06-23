import { IsString, IsEmail, Matches, IsInt, IsNotEmpty, ValidateIf, MinLength, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { IsFile, HasMimeType, MaxFileSize, FileSystemStoredFile, MemoryStoredFile } from 'nestjs-form-data';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    @MinLength(2)
    name: string;

    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @Matches(/^\+380\d{9}$/, { message: 'Phone number must start with code of Ukraine +380 and followed by 9 digits' })
    phone: string;

    @IsInt()
    @Type(() => Number)
    position_id: number;

    @IsFile()
    @MaxFileSize((1024 * 1024) * 5, { message: 'File is too large. Max size is 5Mb' })
    @HasMimeType(['image/jpeg', 'image/png'])
    avatar: MemoryStoredFile
}
