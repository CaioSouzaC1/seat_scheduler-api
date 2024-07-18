import MenuItem from '#models/menu_item'
import { faker } from '@faker-js/faker'

export async function makeMenuItem(override: Partial<MenuItem> = {}) {
  const item = {
    name: faker.food.dish(),
    price: Number(faker.commerce.price()),
    ...override,
  }
  return await MenuItem.create(item)
}
