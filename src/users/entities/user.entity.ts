import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: uuidv4() })
    uuid: string;
    
    @Column({ length: 255 })
    firstName: string;

    @Column({ length: 255 })
    lastName: string;

    @Column({ unique: true, length: 127 })
    username: string;

    @Column({ unique: true, length: 255 })
    email: string;

    @Column()
    password: string;

    @Column({ default: true })
    isActive: boolean;

    @Column({ nullable: true })
    avatarUrl: string;

    @Column({ type: 'text', nullable: true })
    bio: string;

    @Column({ default: false })
    emailVerified: boolean;

    @Column({ nullable: true })
    emailVerificationToken: string;

    @Column({ nullable: true })
    resetPasswordToken: string;

    @Column({ type: 'timestamp', nullable: true })
    resetTokenExpiry: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;
}
