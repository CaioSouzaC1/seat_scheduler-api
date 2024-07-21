import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import UserType from './user_type.js'

export default class UserHasType extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column({ columnName: 'user_id' })
  declare userId: string

  @column({ columnName: 'type_id' })
  declare typeId: string

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => UserType, {
    foreignKey: 'typeId',
  })
  declare type: BelongsTo<typeof UserType>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
