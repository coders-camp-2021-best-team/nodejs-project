import {
    BaseEntity,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity('user_blocks')
export class UserBlock extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User)
    blockedBy: User;

    @ManyToOne(() => User)
    target: User;

    @CreateDateColumn({ type: 'timestamp' })
    createdOn: Date;
}
