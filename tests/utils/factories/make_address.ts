import Address from '#models/address'
import { faker } from '@faker-js/faker'

export async function makeAddress(override: Partial<Address> = {}) {
  const address = {
    neighborhood: faker.location.city(),
    complement: faker.location.secondaryAddress(),
    country: faker.location.country(),
    street: faker.location.streetAddress(),
    number: faker.number.int(100),
    state: faker.location.state(),
    city: faker.location.city(),
    cep: faker.location.zipCode(),
    ...override,
  }
  return await Address.create(address)
}
