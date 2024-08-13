import Booking from '#models/booking'
import { faker } from '@faker-js/faker'

export async function makeBooking(override: Partial<Booking> = {}) {
  const booking = {
    status: faker.helpers.arrayElement(['disponível', 'reservado', 'indisponivel']),
    observation: faker.lorem.lines(1),
    reservedDate: faker.date.soon().toString(),
    ...override,
  }
  return await Booking.create(booking)
}
