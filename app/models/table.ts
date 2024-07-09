import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'
import Store from './store.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Table extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare number: number

  @column()
  declare numberOfChairs: number

  @column()
  declare observation: string

  @column()
  declare status: string

  @column()
  declare storeId: string

  @belongsTo(() => Store)
  declare store: BelongsTo<typeof Store>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static async createUuid(model: Table) {
    model.id = randomUUID()
  }
}

