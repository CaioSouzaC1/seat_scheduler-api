import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Store from './store.js'

export default class StoreUser extends BaseModel {
  static table = 'store_user'

  @column({ isPrimary: true })
  declare id: string

  @column({ columnName: 'user_id' })
  declare userId: string

  @column({ columnName: 'store_id' })
  declare storeId: string

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Store)
  declare type: BelongsTo<typeof Store>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static async createUuid(model: StoreUser) {
    model.id = randomUUID()
  }
}
