import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeCreate,
  beforeFind,
  belongsTo,
  column,
  hasOne,
  manyToMany,
} from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'
import type { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import Address from './address.js'
import type { BelongsTo, HasOne, ManyToMany } from '@adonisjs/lucid/types/relations'
import Company from './company.js'
import StoreAttachement from './store_attachement.js'
import User from './user.js'

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

  @hasOne(() => StoreAttachement)
  declare attachement: HasOne<typeof StoreAttachement>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static async createUuid(model: Store) {
    model.id = randomUUID()
  }

  @beforeFind()
  static bringRelation(query: ModelQueryBuilderContract<typeof Store>) {
    query.preload('address')
    query.preload('company')
  }
}
