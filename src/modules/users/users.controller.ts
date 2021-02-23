import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';

import { PaginationModel, PageModel } from 'common/api/models/pagination';
import { JwtAuthGuard } from 'common/api/guards';
import { AllowAnonymous } from 'common/api/decorators';
import { Response } from 'common/api/models/responses';
import { ApiBaseResponse, ApiErrorResponse, ApiPaginatedResponse, ApiSuccessfulOperation } from 'common/swagger';

import { UsersHandler } from './users.handler';
import { CreateUserDTO, UpdateUserDTO, UserDTO } from './dto';

@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiTags('Users')
@ApiExtraModels(UserDTO)
export class UsersController {
    constructor(private readonly _handler: UsersHandler) {}

    @Get()
    @AllowAnonymous()
    @ApiPaginatedResponse(UserDTO)
    public async getUsers(@Query() pageModel: PageModel): Promise<Response<PaginationModel<UserDTO>>> {
        return this._handler.getUsers(pageModel);
    }

    @Get(':id')
    @ApiBearerAuth()
    @ApiBaseResponse(UserDTO)
    @ApiErrorResponse(HttpStatus.UNAUTHORIZED)
    @ApiErrorResponse(HttpStatus.NOT_FOUND)
    public async getUserById(@Param('id', ParseIntPipe) id: number): Promise<Response<UserDTO>> {
        return this._handler.getUserById(id);
    }

    @Post()
    @AllowAnonymous()
    @ApiBaseResponse(UserDTO, HttpStatus.CREATED)
    @ApiErrorResponse(HttpStatus.CONFLICT)
    public async createUser(@Body() createUserDto: CreateUserDTO): Promise<Response<UserDTO>> {
        return this._handler.createUser(createUserDto);
    }

    @Put(':id')
    @ApiBearerAuth()
    @ApiBaseResponse(UserDTO)
    @ApiErrorResponse(HttpStatus.UNAUTHORIZED)
    @ApiErrorResponse(HttpStatus.NOT_FOUND)
    public async updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDTO,
    ): Promise<Response<UserDTO>> {
        return this._handler.updateUser(id, updateUserDto);
    }

    @Delete(':id')
    @ApiBearerAuth()
    @ApiSuccessfulOperation()
    public async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<Response<void>> {
        return this._handler.deleteUser(id);
    }
}
