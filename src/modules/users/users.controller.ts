import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';

import type { HttpResponse } from 'common/api/responses';
import { PaginationModel, PageModel } from 'common/models/pagination';
import { UserDTO } from 'modules/users/dto/UserDTO';

import { UsersHandler } from './users.handler';
import { CreateUserDTO } from './dto/CreateUserDTO';

@Controller('users')
export class UsersController {
    constructor(private readonly _handler: UsersHandler) {}

    @Get()
    public async getUsers(@Query() pageModel: PageModel): Promise<HttpResponse<PaginationModel<UserDTO>>> {
        return this._handler.getUsers(pageModel);
    }

    @Get(':id')
    public async getUserById(@Param('id', ParseIntPipe) id: number): Promise<HttpResponse<UserDTO>> {
        return this._handler.getUserById(id);
    }

    @Post()
    public async createUser(@Body() createUserDto: CreateUserDTO): Promise<HttpResponse<UserDTO>> {
        return this._handler.createUser(createUserDto);
    }
}
