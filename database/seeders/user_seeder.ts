import User from '#models/user'
import UserHasType from '#models/user_has_type'
import UserType from '#models/user_type'
import { makeAddress } from '#tests/utils/factories/make_address'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { randomUUID } from 'node:crypto'

export default class extends BaseSeeder {
  async run() {
    const type = await UserType.create({
      id: randomUUID(),
      name: 'admin',
    })

    const address = await makeAddress()

    const user = await User.create({
      id: randomUUID(),
      email: 'johndoaaae@gmail.com',
      name: 'john doe',
      phone: '123123123',
      password: '12312312312312',
      addressId: address.id,
    })

    await UserHasType.create({
      userId: user.id,
      typeId: type.id,
    })
  }
}
