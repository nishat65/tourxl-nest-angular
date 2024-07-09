import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'customers' })
export class Customers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: false,
    comment: 'First name of the customer',
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: false,
    comment: 'Last name of the customer',
  })
  lastName: string;

  @Column({
    type: 'varchar',
    length: 20,
    unique: true,
    nullable: false,
    comment: 'Phone number of the customer',
  })
  phone: string;

  @Column({
    type: 'varchar',
    length: 200,
    unique: true,
    nullable: false,
    comment: 'Email of the customer',
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: false,
    comment: 'Password of the customer',
    select: false,
  })
  password: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  address: string;

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

  @BeforeInsert()
  @BeforeUpdate()
  lowercaseNames() {
    if (this.firstName) this.firstName = this.firstName.toLowerCase();
    if (this.lastName) this.lastName = this.lastName.toLowerCase();
    if (this.email) this.email = this.email.toLowerCase();
  }
}
