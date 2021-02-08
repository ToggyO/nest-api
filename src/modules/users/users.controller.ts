import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';

import type { Response } from 'common/api/models/responses';
import { PaginationModel, PageModel } from 'common/api/models/pagination';
import { UserDTO } from 'modules/users/dto/UserDTO';

import { UsersHandler } from './users.handler';
import { CreateUserDTO } from './dto/CreateUserDTO';
import { UpdateUserDTO } from './dto/UpdateUserDTO';

@Controller('users')
export class UsersController {
    constructor(private readonly _handler: UsersHandler) {}

    @Get()
    public async getUsers(@Query() pageModel: PageModel): Promise<Response<PaginationModel<UserDTO>>> {
        return this._handler.getUsers(pageModel);
    }

    @Get(':id')
    public async getUserById(@Param('id', ParseIntPipe) id: number): Promise<Response<UserDTO>> {
        return this._handler.getUserById(id);
    }

    @Post()
    public async createUser(@Body() createUserDto: CreateUserDTO): Promise<Response<UserDTO>> {
        return this._handler.createUser(createUserDto);
    }

    @Put(':id')
    public async updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDTO,
    ): Promise<Response<UserDTO>> {
        return this._handler.updateUser(id, updateUserDto);
    }

    @Delete(':@id')
    public async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this._handler.deleteUser(id);
    }
}
