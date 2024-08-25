import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tables'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()

      table.integer('number').notNullable()
      table.string('observation')

      table.string('status').notNullable().defaultTo('Livre')

      table.uuid('store_id').references('stores.id').onDelete('CASCADE').notNullable()

      table.integer('number_of_chairs').notNullable()

      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
