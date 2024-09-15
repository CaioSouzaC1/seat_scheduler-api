import Booking from '#models/booking'
import Store from '#models/store'
import Table from '#models/table'
import { makeAddress } from '#tests/utils/factories/make_address'
import { makeUser } from '#tests/utils/factories/make_user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { faker } from '@faker-js/faker'

export default class extends BaseSeeder {
  async run() {
    const store = await Store.first()
    const tables = await Table.all()

    for (const table of tables) {
      const address = await makeAddress()
      const user = await makeUser({
        addressId: address!.id,
      })

      await Booking.create({
        observation: faker.lorem.sentence(5),
        tableId: table.id,
        storeId: store!.id,
        status: 'scheduled',
        reservedDate: faker.date.anytime(),
        userId: user.id,
      })
    }
  }
}
