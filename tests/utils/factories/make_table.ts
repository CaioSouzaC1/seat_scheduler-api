import Table from '#models/table'
import { faker } from '@faker-js/faker'

export async function makeTable(override: Partial<Table> = {}) {
  const table = {
    number: faker.number.int(100),
    status: faker.helpers.arrayElement(['available', 'unavailable']),
    observation: faker.lorem.lines(1),
    numberOfChairs: faker.number.int(4),
    ...override,
  }

  return await Table.create(table)
}
