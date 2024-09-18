import MenuItem from '#models/menu_item'
import Store from '#models/store'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { faker } from '@faker-js/faker'

export default class extends BaseSeeder {
  async run() {
    const store = await Store.first()

    for (let i = 0; i < 10; i++) {
      await MenuItem.create({
        name: faker.food.dish(),
        description: faker.food.description(),
        storeId: store!.id,
        price: faker.number.float({ min: 10, max: 100, multipleOf: 0.02 }),
      })
    }
  }
}
