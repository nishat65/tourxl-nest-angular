import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'guides' })
export class Guides {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    unique: true,
    type: 'varchar',
    length: 20,
  })
  phone: string;

  @Column({
    type: 'varchar',
    unique: true,
    length: 200,
  })
  email: string;

  @Column({
    type: 'text',
  })
  officeAddress: string;

  @Column({
    default: 0,
    type: 'int',
  })
  totalToursDone: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @Column({
    default: false,
  })
  isDeleted: boolean;
}
