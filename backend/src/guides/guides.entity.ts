import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

import * as bcrypt from 'bcrypt';

@Entity({ name: 'guides' })
export class Guides {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: false,
    comment: 'First name of the guide',
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: false,
    comment: 'Last name of the guide',
  })
  lastName: string;

  @Column({
    type: 'varchar',
    length: 20,
    unique: true,
    nullable: false,
    comment: 'Phone number of the guide',
  })
  phone: string;

  @Column({
    type: 'varchar',
    length: 200,
    unique: true,
    nullable: false,
    comment: 'Email of the guide',
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: false,
    comment: 'Password of the guide',
    select: false,
  })
  password: string;

  @Column({
    type: 'text',
    nullable: true,
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

  @BeforeInsert()
  @BeforeUpdate()
  lowercaseNames() {
    if (this.firstName) this.firstName = this.firstName.toLowerCase();
    if (this.lastName) this.lastName = this.lastName.toLowerCase();
    if (this.email) this.email = this.email.toLowerCase();
    if (this.password) {
      const encryptedPassword = bcrypt.hashSync(
        this.password,
        bcrypt.genSaltSync(+process.env.PWD_SALT),
      );
      this.password = encryptedPassword;
    }
  }
}
