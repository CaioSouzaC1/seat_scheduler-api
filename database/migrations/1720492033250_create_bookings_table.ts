import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'bookings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()

      table.enum('status', ['disponível', 'reservado', 'indisponivel']).defaultTo('disponível')
      table.string('observation').nullable()
      table.string('reserved_date').notNullable()

      table.uuid('user_id').references('users.id').onDelete('CASCADE').notNullable()
      table.uuid('table_id').references('tables.id').onDelete('CASCADE').notNullable()
      table.uuid('store_id').references('stores.id').onDelete('CASCADE').notNullable()

      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
