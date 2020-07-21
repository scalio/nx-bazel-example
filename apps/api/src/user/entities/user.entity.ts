import { IUser } from '@proto-interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User implements Required<IUser> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  username: string;

  @Column({ length: 500, nullable: true })
  firstName: string;

  @Column({ length: 500, nullable: true })
  lastName: string;

  @Column({ length: 500 })
  password: string;

  constructor(partialUser: Partial<User>) {
    Object.assign(this, partialUser);
  }
}
