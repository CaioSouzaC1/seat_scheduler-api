import { DateTime } from 'luxon'
import {
  afterFind,
  BaseModel,
  beforeCreate,
  beforeFind,
  belongsTo,
  column,
  hasMany,
} from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'
import CompanyAttachement from './company_attachement.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import type { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import env from '#start/env'
import Address from './address.js'
import User from './user.js'

export default class Company extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare cnpj: string

  @column()
  declare addressId: string

  @belongsTo(() => Address)
  declare address: BelongsTo<typeof Address>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column()
  declare userId: string

  @hasMany(() => CompanyAttachement, {
    foreignKey: 'companyId',
  })
  declare attachement: HasMany<typeof CompanyAttachement>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static async createUuid(model: Company) {
    model.id = randomUUID()
  }

  @beforeFind()
  static bringRelation(query: ModelQueryBuilderContract<typeof Company>) {
    query.preload('attachement')
  }

  @afterFind()
  static changeURL(company: Company) {
    company.attachement.map((attachement) => {
      attachement.imagePath = env.get('HOST') + ':' + env.get('PORT') + attachement.imagePath
    })
  }
}
