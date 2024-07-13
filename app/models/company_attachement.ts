import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'

export default class CompanyAttachement extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column({ columnName: 'image_path' })
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
