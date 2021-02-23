import { ApiProperty } from '@nestjs/swagger';

import { Roles } from 'domain/entities/user/roles.enum';

export class UserDTO {
    @ApiProperty()
    public id: number;

    @ApiProperty()
    public firstName: string;

    @ApiProperty()
    public lastName: string;

    @ApiProperty()
    public email: string;

    @ApiProperty()
    public role: Roles;

    @ApiProperty()
    public avatar: string;
}
