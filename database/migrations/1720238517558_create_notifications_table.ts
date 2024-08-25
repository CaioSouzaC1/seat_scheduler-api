import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'notifications'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()

      table.uuid('user_id').references('users.id').onDelete('CASCADE').notNullable()

      table.string('title').notNullable()
      table.string('type').notNullable()
      table.string('message').notNullable()
      table.json('data').notNullable()

      table.boolean('read').defaultTo(false)

      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
