import vine from '@vinejs/vine'

export const storeBookingValidation = vine.compile(
  vine.object({
    observation: vine.string().optional(),
    reservedDate: vine.string(),
    storeId: vine
      .string()
      .uuid()
      .exists(async (db, value) => {
        const store = await db.from('stores').where('id', value).first()
        return store ? true : false
      }),
    tableId: vine
      .string()
      .uuid()
      .exists(async (db, value) => {
        const table = await db.from('tables').where('id', value).first()
        return table ? true : false
      }),
  })
)

export const editBookingValidation = vine.compile(
  vine.object({
    observation: vine.string().optional(),
    reservedDate: vine.string().optional(),
    params: vine.object({
      id: vine
        .string()
        .uuid()
        .exists(async (db, value) => {
          const booking = await db.from('bookings').where('id', value).first()
          return booking ? true : false
        }),
    }),
  })
)

export const idBookingRequest = vine.compile(
  vine.object({
    params: vine.object({
      id: vine
        .string()
        .uuid()
        .exists(async (db, value) => {
          const booking = await db.from('bookings').where('id', value).first()
          return booking ? true : false
        }),
    }),
  })
)
