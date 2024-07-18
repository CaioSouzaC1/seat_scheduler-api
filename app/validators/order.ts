import vine from '@vinejs/vine'

export const orderStoreValidator = vine.compile(
  vine.object({
    tableId: vine.string().exists(async (db, value) => {
      const store = await db.from('tables').where('id', value).first()
      return store ? true : false
    }),
    itemId: vine.array(
      vine.string().exists(async (db, value) => {
        const item = await db.from('menu_items').where('id', value).first()
        return item ? true : false
      })
    ),
  })
)

export const orderIdValidator = vine.compile(
  vine.object({
    params: vine.object({
      id: vine.string().exists(async (db, value) => {
        const order = await db.from('orders').where('id', value).first()
        return order ? true : false
      }),
    }),
  })
)
