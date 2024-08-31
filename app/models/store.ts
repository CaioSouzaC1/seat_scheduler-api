import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeCreate,
  belongsTo,
  column,
  hasMany,
  hasOne,
  manyToMany,
} from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'
import Address from './address.js'
import type { BelongsTo, HasMany, HasOne, ManyToMany } from '@adonisjs/lucid/types/relations'
import Company from './company.js'
import StoreAttachement from './store_attachement.js'
import User from './user.js'
import Evaluation from './evaluation.js'
import Advert from './advert.js'

export default class Store extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare phone: string

  @column()
  declare description: string

  @column({ columnName: 'address_id' })
  declare addressId: string

  @column({ columnName: 'company_id' })
  declare companyId: string

  @belongsTo(() => Address)
  declare address: BelongsTo<typeof Address>

  @belongsTo(() => Company)
  declare company: BelongsTo<typeof Company>

  @manyToMany(() => User)
  declare user: ManyToMany<typeof User>

  @hasMany(() => StoreAttachement)
  declare attachement: HasMany<typeof StoreAttachement>

  @hasOne(() => Evaluation)
  declare evaluation: HasOne<typeof Evaluation>

  @hasOne(() => Advert)
  declare advert: HasOne<typeof Advert>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static async createUuid(model: Store) {
    model.id = randomUUID()
  }
}
