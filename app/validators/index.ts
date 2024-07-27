import vine from '@vinejs/vine'

export const indexValidation = vine.compile(
  vine.object({
    params: vine.object({
      page: vine.string().transform((value) => {
        if (value) return value
        else return '1'
      }),
      limit: vine.string().transform((value) => {
        if (value) return value
        else return '10'
      }),
    }),
  })
)

export const indexTableValidation = vine.compile(
  vine.object({
    params: vine.object({
      id: vine
        .string()
        .uuid()
        .exists(async (db, value) => {
          const store = await db.from('stores').where('id', value).first()
          return store ? true : false
        }),
      page: vine.string().transform((value) => {
        if (value) return value
        else return '1'
      }),
      limit: vine.string().transform((value) => {
        if (value) return value
        else return '10'
      }),
    }),
  })
)
