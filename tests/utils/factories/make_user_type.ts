import UserType from '#models/user_type'
import { faker } from '@faker-js/faker'

export async function makeUserType(override: Partial<UserType> = {}) {
  const user = {
    name: faker.helpers.arrayElement(['admin', 'operator']),
    ...override,
  }

  return await UserType.create(user)
}
