import type { Roles } from 'domain/entities/user/roles.enum';

export class UserDTO {
    public id: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public role: Roles;
    public avatar: string;
}
