import { Injectable, HttpException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetUsersDto } from './dto/get-users.dto';
import { ConfigService } from '@nestjs/config';
import { Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { Positions } from '~/lib/constants';
import { MinioService } from '../minio/minio.service';
import { SUCCESS_REGISTER } from '~/lib/constants';
import sharp from 'sharp';
import axios from 'axios';
import { MemoryStoredFile } from 'nestjs-form-data';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly configService: ConfigService,
        private readonly minioService: MinioService,
    ) { }

    private readonly URL = this.configService.get('URL');

    private async modifyImage(image: MemoryStoredFile) {
        const croppedImage = await this.cropImage(image);
        const tinify = await this.tinify(croppedImage as MemoryStoredFile);
        const buffer = Buffer.from(tinify);
        return {
            ...image,
            buffer,
            size: buffer.length,
            mimetype: 'image/jpeg',
        }
    }

    private async tinify(file: MemoryStoredFile) {
        const URL = 'https://api.tinify.com/shrink';
        const request = await axios.post(URL, file.buffer, {
            auth: {
                username: 'api',
                password: this.configService.get('TINIFY_TOKEN'),
            },
            headers: {
                'Content-Type': 'application/octet-stream',
            },
            data: file.buffer,
        })

        const image = await axios.get(request.data.output.url, {
            responseType: 'arraybuffer',
        });
        return Buffer.from(image.data, 'binary');
    }

    private async cropImage(image: MemoryStoredFile) {
        const cropData = {
            width: 70,
            height: 70,
        };

        const buffer = await sharp(image.buffer)
            .resize(cropData.width, cropData.height, {
                fit: sharp.fit.cover,
                position: sharp.strategy.attention,
            })
            .toFormat('jpeg')
            .toBuffer();

        return {
            ...image,
            buffer,
            size: buffer.length,
            mimetype: 'image/jpeg',
        }
    }

    private paginateUsers(data: Prisma.UsersUncheckedCreateInput[], { page, count }: GetUsersDto) {
        const start = (page - 1) * count;
        const end = start + count;

        return data.slice(start, end);

    }

    public async findAll({ page, count }: GetUsersDto) {
        const data = await this.prismaService.users.findMany();
        const totalUsers = data.length;

        const paginateData = this.paginateUsers(data, { page, count });
        const totalPages = Math.ceil(totalUsers / count);

        if (page > totalPages) {
            throw new Error('Page not found');
        }

        return {
            page,
            total_pages: totalPages,
            total_users: totalUsers,
            count,
            links: {
                next: page < totalPages ? `${this.URL}/api/users?page=${page + 1}&count=${count}` : null,
                prev: page > 1 ? `${this.URL}/api/users?page=${page - 1}&count=${count}` : null,
            },
            users: paginateData,
        }
    }

    public async createUser({
        email,
        name,
        phone,
        position_id,
        avatar
    }: CreateUserDto) {
        const isExist = await this.prismaService.users.findFirst({
            where: {
                OR: [
                    { email },
                    { phone }
                ]
            }
        });

        if (isExist) {
            throw new BadRequestException('User with this phone or email already exist');
        }
        
        const modifiedImage = await this.modifyImage(avatar);
        const picture = await this.minioService.uploadFile(modifiedImage as MemoryStoredFile);

        const user = await this.prismaService.users.create({
            data: {
                email,
                name,
                phone,
                position: Object.keys(Positions)[position_id-1],
                position_id: String(position_id),
                avatar: picture.url,
                registration_timestamp: Math.round(Date.now() / 1000),
            }
        });

        return {
            user_id: user.id,
            message: SUCCESS_REGISTER
        }

    }

    public async findOne({userId}: GetUserDto) {
        const data = await this.prismaService.users.findUnique({
            where: {
                id: userId,
            },
        });
        return {
            user: data,
        }
    }

}
