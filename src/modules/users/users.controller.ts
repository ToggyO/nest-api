import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';

import type { Response } from 'common/api/models/responses';
import { PaginationModel, PageModel } from 'common/api/models/pagination';
import { SessionAuthGuard } from 'common/api/guards';
import { AllowAnonymous } from 'common/api/decorators';

import { UsersHandler } from './users.handler';
import { CreateUserDTO, UpdateUserDTO, UserDTO } from './dto';

@UseGuards(SessionAuthGuard)
@Controller('users')
export class UsersController {
    constructor(private readonly _handler: UsersHandler) {}

    @Get()
    public async getUsers(@Query() pageModel: PageModel): Promise<Response<PaginationModel<UserDTO>>> {
        return this._handler.getUsers(pageModel);
    }

    @Get(':id')
    @AllowAnonymous()
    public async getUserById(@Param('id', ParseIntPipe) id: number): Promise<Response<UserDTO>> {
        return this._handler.getUserById(id);
    }

    @Post()
    @AllowAnonymous()
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

    @Delete(':id')
    public async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<Response<void>> {
        return this._handler.deleteUser(id);
    }
}
