import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'
import Store from './store.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class MenuItem extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare price: number

  @column()
  declare description: string

  @column({ columnName: 'store_id' })
  declare storeId: string

  @belongsTo(() => Store)
  declare store: BelongsTo<typeof Store>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static async createUuid(model: MenuItem) {
    model.id = randomUUID()
  }
}
