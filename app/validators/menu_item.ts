import vine from '@vinejs/vine'

export const storeMenuItemValidation = vine.compile(
  vine.object({
    name: vine.string(),
    description: vine.string().optional(),
    price: vine.number(),
    storeId: vine
      .string()
      .uuid()
      .exists(async (db, value) => {
        const store = await db.from('stores').where('id', value).first()
        return store ? true : false
      }),
  })
)

export const indexMenuItemValidation = vine.compile(
  vine.object({
    search: vine.string().optional(),
    page: vine.number().optional(),
    limit: vine.number().optional(),
    storeId: vine
      .string()
      .uuid()
      .exists(async (db, value) => {
        const store = await db.from('stores').where('id', value).first()
        return store ? true : false
      }),
  })
)

export const editTableValidation = vine.withMetaData<{ userId: string }>().compile(
  vine.object({
    number: vine.number().optional(),
    numberOfChairs: vine.number().optional(),
    status: vine.enum(['available', 'scheduled', 'busy']).optional(),
    observation: vine.string().optional(),
    params: vine.object({
      id: vine
        .string()
        .uuid()
        .exists(async (db, value, field) => {
          const table = await db
            .query({ mode: 'read' })
            .from('tables')
            .innerJoin('store_user', 'store_user.store_id', 'tables.store_id')
            .where('tables.id', value)
            .andWhere('store_user.user_id', field.meta.userId)
            .first()

          return table ? true : false
        }),
    }),
  })
)

export const idTableValidation = vine.compile(
  vine.object({
    params: vine.object({
      id: vine
        .string()
        .uuid()
        .exists(async (db, value) => {
          const table = await db.from('tables').where('id', value).first()
          return table ? true : false
        }),
    }),
  })
)

export const idParamTableValidation = vine.compile(
  vine.object({
    params: vine.object({
      id: vine
        .string()
        .uuid()
        .exists(async (db, value) => {
          const store = await db.from('stores').where('id', value).first()
          return store ? true : false
        }),
    }),
  })
)

export const DeleteInBulkMenuItemsValidation = vine.compile(
  vine.object({
    menuItems: vine.array(
      vine
        .string()
        .uuid()
        .exists(async (db, value) => {
          const table = await db.from('menu_items').where('id', value).first()
          return !!table
        })
    ),
    storeId: vine
      .string()
      .uuid()
      .exists(async (db, value) => {
        const store = await db.from('stores').where('id', value).first()
        return store ? true : false
      }),
  })
)
