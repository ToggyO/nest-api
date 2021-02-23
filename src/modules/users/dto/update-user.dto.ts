import { IsNotEmpty } from 'class-validator';

export class UpdateUserDTO {
    @IsNotEmpty()
    public firstName: string;

    @IsNotEmpty()
    public lastName: string;
}
