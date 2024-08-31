import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeCreate,
  beforeFetch,
  beforeFind,
  belongsTo,
  column,
} from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Store from './store.js'
import type { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import { randomUUID } from 'node:crypto'

export default class Evaluation extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare note: number

  @column()
  declare description: string

  @column({ columnName: 'user_id' })
  declare userId: string

  @column({ columnName: 'store_id' })
  declare storeId: string

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Store)
  declare store: BelongsTo<typeof Store>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static async createUuid(model: Evaluation) {
    model.id = randomUUID()
  }
}
