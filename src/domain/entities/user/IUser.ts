import { Roles } from './roles.enum';

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
    salt: string;
    role: Roles;
    avatar: string;
}
