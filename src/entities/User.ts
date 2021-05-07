import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';

@Entity()
export class User extends BaseEntity {
  @Property()
  firstName: string;

  @Property()
  lastName: string;

  @Property({ persist: false })
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  @Property()
  email: string;

  @Property()
  password!: string;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }
}
