import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import {
  BaseModel,
  beforeCreate,
  beforeFind,
  belongsTo,
  column,
  hasOne,
  manyToMany,
} from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { randomUUID } from 'node:crypto'
import Company from './company.js'
import type { BelongsTo, HasOne, ManyToMany } from '@adonisjs/lucid/types/relations'
import Address from './address.js'
import Store from './store.js'
import UserType from './user_type.js'
import Evaluation from './evaluation.js'
import type { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare email: string

  @column()
  declare phone: string

  @column({ columnName: 'last_login' })
  declare lastLogin: string

  @column({ columnName: 'login_count' })
  declare loginCount: number

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare addressId: string

  @belongsTo(() => Address)
  declare address: BelongsTo<typeof Address>

  @manyToMany(() => Store)
  declare store: ManyToMany<typeof Store>

  @manyToMany(() => UserType, {
    pivotTable: 'user_has_types',
    localKey: 'id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'type_id',
    pivotForeignKey: 'user_id',
    pivotTimestamps: true,
    pivotColumns: ['id'],
  })
  declare type: ManyToMany<typeof UserType>

  @hasOne(() => Company)
  declare company: HasOne<typeof Company>

  @hasOne(() => Evaluation)
  declare evaluation: HasOne<typeof Evaluation>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User, {
    expiresIn: '30 days',
    prefix: 'oat_',
    table: 'auth_access_tokens',
    type: 'auth_token',
    tokenSecretLength: 40,
  })

  @beforeCreate()
  static async createUuid(model: User) {
    model.id = randomUUID()
  }

  @beforeFind()
  static ignoreDeleted(query: ModelQueryBuilderContract<typeof User>) {
    query.preload('company')
    query.preload('address')
    query.preload('type')
    query.preload('store')
  }
}
