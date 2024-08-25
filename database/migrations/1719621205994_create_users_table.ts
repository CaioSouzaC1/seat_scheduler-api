import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('name').notNullable()
      table.string('phone').notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()

      table.uuid('address_id').references('addresses.id').onDelete('CASCADE').notNullable()

      table.integer('login_count').defaultTo(0)

      table.string('image_path')
      table.string('last_login')

      table.timestamp('created_at', { useTz: true }).defaultTo(this.now()).notNullable()
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
