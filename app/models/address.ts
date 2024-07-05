import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, hasOne } from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Company from './company.js'

export default class Address extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare cep: string

  @column()
  declare country: string

  @column()
  declare state: string

  @column()
  declare city: string

  @column()
  declare neighborhood: string

  @column()
  declare street: string

  @column()
  declare number: number

  @column()
  declare complement: string | null

  @hasOne(() => User)
  declare user: HasOne<typeof User>

  @hasOne(() => Company)
  declare company: HasOne<typeof Company>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static async createUuid(model: Address) {
    model.id = randomUUID()
  }
}
