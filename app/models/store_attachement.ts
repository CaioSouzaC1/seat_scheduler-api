import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Store from './store.js'

export default class StoreAttachement extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare type: string

  @column({ columnName: 'image_path' })
  declare imagePath: string

  @column({ columnName: 'store_id' })
  declare storeId: string

  @belongsTo(() => Store)
  declare attach: BelongsTo<typeof Store>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static createUuid(model: StoreAttachement) {
    model.id = randomUUID()
  }
}
