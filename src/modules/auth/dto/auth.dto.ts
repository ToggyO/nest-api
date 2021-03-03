import { ApiProperty } from '@nestjs/swagger';

import { UserDTO } from 'modules/users/dto/user.dto';
import { TokenDTO } from 'providers/tokens/dto';

export class AuthDTO {
    @ApiProperty()
    public user: UserDTO;

    @ApiProperty()
    public tokens: TokenDTO;
}
