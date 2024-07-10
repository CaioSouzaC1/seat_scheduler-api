import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'bookings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()

      table.string('status').defaultTo('pending')
      table.string('observation').nullable()
      table.string('reserved_date').notNullable()

      table.uuid('user_id').references('users.id').onDelete('CASCADE')
      table.uuid('table_id').references('tables.id').onDelete('CASCADE')

      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
