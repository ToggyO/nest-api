import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Roles } from 'domain/entities/user/roles.enum';

@Entity({ name: 'user' })
export class UserOrmEntity {
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

    @CreateDateColumn({ name: 'created_at', type: 'datetime' })
    protected createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
    protected updatedAt: Date;
}
