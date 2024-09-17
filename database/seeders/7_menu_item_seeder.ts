import MenuItem from '#models/menu_item'
import Store from '#models/store'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { faker } from '@faker-js/faker'

export default class extends BaseSeeder {
  async run() {
    const store = await Store.first()

    for (let i = 0; i < 10; i++) {
      await MenuItem.create({
        name: faker.company.name(),
        description: faker.lorem.sentence(5),
        storeId: store!.id,
        price: faker.string.numeric(2),
      })
    }
  }
}
