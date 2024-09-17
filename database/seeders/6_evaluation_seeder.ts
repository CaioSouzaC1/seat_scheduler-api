import Evaluation from '#models/evaluation'
import Store from '#models/store'
import Table from '#models/table'
import { makeAddress } from '#tests/utils/factories/make_address'
import { makeUser } from '#tests/utils/factories/make_user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { faker } from '@faker-js/faker'

export default class extends BaseSeeder {
  async run() {
    const store = await Store.first()

    for (let i = 0; i < 10; i++) {
      const address = await makeAddress()

      const user = await makeUser({
        addressId: address!.id,
      })

      const table = await Table.all()
      await Evaluation.create({
        note: faker.number.int({ max: 10 }),
        description: faker.lorem.sentence(5),
        storeId: store!.id,
        userId: user.id,
      })
    }
  }
}
