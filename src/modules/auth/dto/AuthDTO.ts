import type { UserDTO } from 'modules/users/dto/UserDTO';

import type { TokenDTO } from 'providers/tokens/dto';

export class AuthDTO {
    public user: UserDTO;
    public tokens: TokenDTO;
}
