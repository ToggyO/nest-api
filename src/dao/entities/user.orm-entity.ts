import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Roles } from 'domain/entities/user/roles.enum';
import type { IUser } from 'domain/entities/user/IUser';

@Entity({ name: 'user' })
export class UserOrmEntity implements IUser {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ type: 'text', nullable: false })
    public firstName: string;

    @Column({ type: 'text', nullable: false })
    public lastName: string;

    @Column({ type: 'text', nullable: false })
    public email: string;

    @Column({ type: 'text', nullable: false })
    public passwordHash: string;

    @Column({ type: 'text', nullable: false })
    public salt: string;

    @Column({ type: 'int', enum: Roles, default: Roles.User, nullable: false })
    public role: Roles;

    @Column({ type: 'text', nullable: true })
    public avatar: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    protected createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    protected updatedAt: Date;
}
