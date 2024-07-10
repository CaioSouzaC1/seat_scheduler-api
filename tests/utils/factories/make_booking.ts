import Booking from '#models/booking'
import { faker } from '@faker-js/faker'

export async function makeUser(override: Partial<Booking> = {}) {
  const booking = {
    status: faker.helpers.arrayElement(['pending', 'accepted']),
    observation: faker.lorem.lines(1),
    reservedDate: faker.date.soon().toString(),
    ...override,
  }
  return await Booking.create(booking)
}
