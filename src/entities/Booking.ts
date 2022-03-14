import { Entity, Property, ManyToOne, Enum } from '@mikro-orm/core';
import { BaseEntity, User } from './index';

@Entity()
export class Booking extends BaseEntity {
  @Property()
  bookingId!: string;

  @Enum(() => BookingStatus)
  status: BookingStatus;

  @Property()
  hotelName!: string;

  @ManyToOne()
  guestName!: User;

  @Property()
  start!: string;

  @Property()
  end!: string;

  @Property()
  rateTotal: number;

  constructor(
    bookingId: string,
    status: BookingStatus,
    hotelName: string,
    start: string,
    end: string,
    rateTotal: number,
    guestName: User
  ) {
    super();
    this.bookingId = bookingId;
    this.status = status;
    this.hotelName = hotelName;
    this.start = start;
    this.end = end;
    this.rateTotal = rateTotal;
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
