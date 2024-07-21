import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import UserType from './user_type.js'

export default class StoreUser extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => UserType)
  declare type: BelongsTo<typeof UserType>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static async createUuid(model: StoreUser) {
    model.id = randomUUID()
  }
}
