import { Entity, Property, ManyToOne, Enum } from '@mikro-orm/core';
import { BaseEntity, User } from './index';

@Entity()
export class Booking extends BaseEntity {
  @Property()
  bookingId!: string;

  @Enum(() => BookingStatus)
  status: BookingStatus;

  @Property()
  hotelId!: string;

  @Property()
  hotelName!: string;

  @ManyToOne(() => User)
  guestName!: User;

  @Property()
  start!: string;

  @Property()
  end!: string;

  constructor(
    bookingId: string,
    status: BookingStatus,
    hotelId: string,
    hotelName: string,
    start: string,
    end: string,
    guestName: User
  ) {
    super();
    this.bookingId = bookingId;
    this.status = status;
    this.hotelId = hotelId;
    this.hotelName = hotelName;
    this.start = start;
    this.end = end;
    this.guestName = guestName;
  }
}

export enum BookingStatus {
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
  NO_SHOW = 'NO_SHOW',
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  PAYMENT_REQUIRED = 'PAYMENT_REQUIRED',
  PAYMENT_ABANDONED = 'PAYMENT_ABANDONED',
}
