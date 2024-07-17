import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'
import env from '#start/env'
import { Env } from '@adonisjs/core/env'

export default class CompanyAttachement extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column({
    columnName: 'image_path',
    serialize: (value: string) => {
      return env.get('HOST') + ':' + env.get('PORT') + value
    },
  })
  declare imagePath: string

  @column({ columnName: 'company_id' })
  declare companyId: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static async createUuid(model: CompanyAttachement) {
    model.id = randomUUID()
  }
}
