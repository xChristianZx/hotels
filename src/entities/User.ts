import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core';
import { BaseEntity, Booking } from './index';

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

  @OneToMany(() => Booking, b => b.guestName)
  bookings = new Collection<Booking>(this);

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
