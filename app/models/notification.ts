import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'

export default class Notification extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare type: string

  @column()
  declare title: string

  @column()
  declare message: string

  @column()
  declare read: boolean

  @column()
  declare data: object

  @column({ columnName: 'user_id' })
  declare userId: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static async createUuid(model: Notification) {
    model.id = randomUUID()
  }
}
