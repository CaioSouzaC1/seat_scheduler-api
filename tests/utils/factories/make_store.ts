import Store from '#models/store'
import { faker } from '@faker-js/faker'

export async function makeStore(override: Partial<Store> = {}) {
  const store = {
    name: faker.company.name(),
    phone: faker.phone.number(),
    description: faker.lorem.lines(1),
    ...override,
  }
  return await Store.create(store)
}
