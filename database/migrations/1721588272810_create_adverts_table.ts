import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'adverts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()

      table.string('name').notNullable()
      table.string('type').notNullable()

      table.uuid('company_id').references('companies.id').onDelete('CASCADE').notNullable()
      table.uuid('store_id').references('stores.id').onDelete('CASCADE').notNullable()

      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
