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
import Company from './company.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import AdvertAttachement from './advert_attachement.js'
import { randomUUID } from 'node:crypto'
import Store from './store.js'
import type { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'

export default class Advert extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare type: string

  @column({ columnName: 'company_id' })
  declare companyId: string

  @column({ columnName: 'store_id' })
  declare storeId: string

  @belongsTo(() => Company)
  declare company: BelongsTo<typeof Company>

  @belongsTo(() => Store)
  declare store: BelongsTo<typeof Store>

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

  @beforeFind()
  static bringRelation(query: ModelQueryBuilderContract<typeof Advert>) {
    query.preload('attachements')
    query.preload('company')
    query.preload('store')
  }

  @beforeFetch()
  static bringRelationMany(query: ModelQueryBuilderContract<typeof Advert>) {
    query.preload('attachements')
    query.preload('company')
    query.preload('store')
  }
}
