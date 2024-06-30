import UserType from '#models/user_type'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await UserType.createMany([
      {
        name: 'admin',
      },
      {
        name: 'operator',
      },
    ])
  }
}

