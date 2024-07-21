import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import Company from './company.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import AdvertAttachement from './advert_attachement.js'
import { randomUUID } from 'node:crypto'

export default class Advert extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare type: string

  @column({ columnName: 'company_id' })
  declare companyId: string

  @belongsTo(() => Company)
  declare company: BelongsTo<typeof Company>

  @hasMany(() => AdvertAttachement)
  declare attachements: HasMany<typeof AdvertAttachement>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static async createUuid(model: Advert) {
    model.id = randomUUID()
  }
}
