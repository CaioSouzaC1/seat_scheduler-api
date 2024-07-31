import db from '@adonisjs/lucid/services/db'
import vine from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types'
type Options = {
  userId: string
}
async function userHasStore(value: unknown, options: Options, field: FieldContext) {
  console.log(options)
  const row = await db.from('store_user').where({ user_id: options.userId, storeId: value }).first()

  if (row) {
    field.report('The {{ field }} field is not unique', 'unique', field)
  }
}

/**
 * Converting a function to a VineJS rule
 */
export const userHasStoreRule = vine.createRule(userHasStore)
