import type { UserDTO } from 'modules/users/dto/user.dto';

import type { TokenDTO } from 'providers/tokens/dto';

export class AuthDTO {
    public user: UserDTO;
    public tokens: TokenDTO;
}
