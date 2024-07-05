import User from '#models/user'
import UserHasType from '#models/user_has_type'
import UserType from '#models/user_type'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { randomUUID } from 'node:crypto'

export default class extends BaseSeeder {
  async run() {
    const type = await UserType.create({
      id: randomUUID(),
      name: 'admin',
    })

    const user = await User.create({
      id: randomUUID(),
      email: 'johndoe@gmail.com',
      name: 'john doe',
      phone: '123123123',
      password: '123',
    })

    await UserHasType.create({
      userId: user.id,
      typeId: type.id,
    })
  }
}

