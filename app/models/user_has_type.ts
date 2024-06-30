import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'

export default class UserHasType extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column({ columnName: 'user_id' })
  declare userId: string

  @column({ columnName: 'type_id' })
  declare typeId: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static async createUuid(model: UserHasType) {
    model.id = randomUUID()
  }
}
