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
import Table from './table.js'
import MenuItem from './menu_item.js'
import { randomUUID } from 'node:crypto'
import type { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare status: string

  @column({ columnName: 'menu_item_id' })
  declare menuItemId: string

  @column({ columnName: 'table_id' })
  declare tableId: string

  @column({ columnName: 'user_id' })
  declare userId: string

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Table)
  declare table: BelongsTo<typeof Table>

  @belongsTo(() => MenuItem)
  declare menu: BelongsTo<typeof MenuItem>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static async createUuid(model: Order) {
    model.id = randomUUID()
  }
}
