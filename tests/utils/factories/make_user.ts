import User from '#models/user'
import { faker } from '@faker-js/faker'

export async function makeUser(override: Partial<User> = {}) {
  const user = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    phone: faker.string.numeric(11),
    ...override,
  }
  return await User.create(user)
}
