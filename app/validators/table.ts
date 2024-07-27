import vine from '@vinejs/vine'

export const storeInBulkTableValidation = vine.compile(
  vine.object({
    numberOfTables: vine.number().min(1),
    numberOfChairs: vine.number(),
    status: vine.string(),
    observation: vine.string(),
    storeId: vine
      .string()
      .uuid()
      .exists(async (db, value) => {
        const store = await db.from('stores').where('id', value).first()
        return store ? true : false
      }),
  })
)

export const storeTableValidation = vine.compile(
  vine.object({
    number: vine.number(),
    numberOfChairs: vine.number(),
    status: vine.string(),
    observation: vine.string(),
    storeId: vine
      .string()
      .uuid()
      .exists(async (db, value) => {
        const store = await db.from('stores').where('id', value).first()
        return store ? true : false
      }),
  })
)

export const editTableValidation = vine.compile(
  vine.object({
    number: vine.number().optional(),
    numberOfChairs: vine.number().optional(),
    status: vine.string().optional(),
    observation: vine.string().optional(),
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
