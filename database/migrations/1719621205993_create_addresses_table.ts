import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'addresses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()

      table.string('cep').notNullable()
      table.string('country').notNullable()
      table.string('state').notNullable()
      table.string('city').notNullable()
      table.string('neighborhood').notNullable()
      table.string('street').notNullable()
      table.integer('number').notNullable()

      table.string('complement')

      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
