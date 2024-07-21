import UserType from '#models/user_type'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { randomUUID } from 'node:crypto'

export default class extends BaseSeeder {
  async run() {
    await UserType.create({
      id: randomUUID(),
      name: 'operator',
    })
  }
}
