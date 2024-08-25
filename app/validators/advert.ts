import vine from '@vinejs/vine'

export const storeAdvertValidation = vine.compile(
  vine.object({
    name: vine.string(),
    type: vine.string(),
    storeId: vine
      .string()
      .uuid()
      .exists(async (db, value) => {
        const store = await db.from('stores').where('id', value).first()
        return store ? true : false
      }),

    images: vine.array(
      vine.file({
        size: '10mb',
        extnames: ['jpg', 'png', 'jpeg'],
      })
    ),
  })
)

export const editAdvertValidation = vine.compile(
  vine.object({
    name: vine.string().optional(),
    type: vine.string().optional(),

    images: vine
      .array(
        vine.file({
          size: '10mb',
          extnames: ['jpg', 'png', 'jpeg'],
        })
      )
      .optional(),

    params: vine.object({
      id: vine
        .string()
        .uuid()
        .exists(async (db, value) => {
          const advert = await db.from('adverts').where('id', value).first()
          return advert ? true : false
        }),
    }),
  })
)

export const idAdvertValidation = vine.compile(
  vine.object({
    params: vine.object({
      id: vine
        .string()
        .uuid()
        .exists(async (db, value) => {
          const advert = await db.from('adverts').where('id', value).first()
          return advert ? true : false
        }),
    }),
  })
)
