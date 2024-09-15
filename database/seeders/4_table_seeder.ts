import Store from '#models/store'
import Table from '#models/table'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { faker } from '@faker-js/faker'
import { randomUUID } from 'node:crypto'

export default class extends BaseSeeder {
  async run() {
    const store = await Store.first()

    await Table.create({
      id: randomUUID(),
      number: faker.number.int({ max: 10 }),
      status: faker.helpers.arrayElement(['available', 'scheduled', 'busy']),
      storeId: store!.id,
      observation: faker.lorem.sentence(5),
      numberOfChairs: 4,
    })

    await Table.create({
      id: randomUUID(),
      number: faker.number.int({ max: 10 }),
      status: faker.helpers.arrayElement(['available', 'scheduled', 'busy']),
      storeId: store!.id,
      observation: faker.lorem.sentence(5),
      numberOfChairs: 4,
    })

    await Table.create({
      id: randomUUID(),
      number: faker.number.int({ max: 10 }),
      status: faker.helpers.arrayElement(['available', 'scheduled', 'busy']),
      storeId: store!.id,
      observation: faker.lorem.sentence(5),
      numberOfChairs: 4,
    })
  }
}
