import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'orders'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()

      table.string('status').defaultTo('Pendente')

      table.uuid('table_id').references('tables.id').onDelete('CASCADE').notNullable()
      table.uuid('user_id').references('users.id').onDelete('CASCADE').notNullable()
      table.uuid('menu_item_id').references('menu_items.id').onDelete('CASCADE').notNullable()

      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
