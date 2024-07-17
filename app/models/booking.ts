import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, beforeFetch, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Table from './table.js'
import { randomUUID } from 'node:crypto'
import type { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import Store from './store.js'

export default class Booking extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare status: string

  @column()
  declare observation: string

  @column({ columnName: 'store_id' })
  declare storeId: string

  @column({ columnName: 'reserved_date' })
  declare reservedDate: string

  @column({ columnName: 'table_id' })
  declare tableId: string

  @column({ columnName: 'user_id' })
  declare userId: string

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Table)
  declare table: BelongsTo<typeof Table>

  @belongsTo(() => Store)
  declare store: BelongsTo<typeof Store>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static async createUuid(model: User) {
    model.id = randomUUID()
  }

  @beforeFetch()
  static bringRelationMany(query: ModelQueryBuilderContract<typeof Booking>) {
    query.preload('table')
    query.preload('user')
  }
}
