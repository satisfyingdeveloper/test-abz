import { Controller, Get, Post, Query, Param, ValidationPipe, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { GetUsersDto } from './dto/get-users.dto';
import { GetUserDto } from './dto/get-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { FormDataRequest } from 'nestjs-form-data';
import { TokenGuard } from '~/lib/guards/token.guard';


@Controller('users')
export class UsersController {

    constructor(
        private readonly usersService: UsersService,
    ) { }

    @Get('/')
    async getUsers(
        @Query(
            new ValidationPipe({ transform: true })
        ) query: GetUsersDto
    ) {
        return this.usersService.findAll(query);
    }

    @Get('/:userId')
    async getUser(
        @Param() query: GetUserDto
    ) {
        return this.usersService.findOne(query);
    }

    @Post('/')
    @UseGuards(TokenGuard)
    @FormDataRequest()
    async createUser(
        @Body() body: CreateUserDto,
    ) {
        return this.usersService.createUser(body);
    }
}
