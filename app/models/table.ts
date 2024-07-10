import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeCreate,
  beforeFetch,
  beforeFind,
  belongsTo,
  column,
  hasMany,
} from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'
import Store from './store.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import type { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import Booking from './booking.js'

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

  @hasMany(() => Booking)
  declare booking: HasMany<typeof Booking>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static async createUuid(model: Table) {
    model.id = randomUUID()
  }

  @beforeFind()
  static bringRelation(query: ModelQueryBuilderContract<typeof Table>) {
    query.preload('booking')
  }

  @beforeFetch()
  static bringRelationMany(query: ModelQueryBuilderContract<typeof Table>) {
    query.preload('booking')
  }
}
