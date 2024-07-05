import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, manyToMany } from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class UserType extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @manyToMany(() => User, {
    pivotTable: 'user_has_types',
    localKey: 'id',
    pivotForeignKey: 'type_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'user_id',
  })
  declare user: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static async createUuid(model: UserType) {
    model.id = randomUUID()
  }
}
