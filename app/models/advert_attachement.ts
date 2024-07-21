import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import Advert from './advert.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { randomUUID } from 'node:crypto'

export default class AdvertAttachement extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column({ columnName: 'image_path' })
  declare imagePath: string

  @column({ columnName: 'advert_id' })
  declare advertId: string

  @belongsTo(() => Advert)
  declare advert: BelongsTo<typeof Advert>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static async createUuid(model: AdvertAttachement) {
    model.id = randomUUID()
  }
}
