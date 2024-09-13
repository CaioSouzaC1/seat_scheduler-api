import Booking from '#models/booking'
import { faker } from '@faker-js/faker'

export async function makeBooking(override: Partial<Booking> = {}) {
  const booking = {
    status: faker.helpers.arrayElement(['available', 'scheduled', 'busy']),
    observation: faker.lorem.lines(1),
    reservedDate: faker.date.soon().toString(),
    ...override,
  }
  return await Booking.create(booking)
}
