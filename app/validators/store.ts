import vine from '@vinejs/vine'

export const storeStoreValidation = vine.compile(
  vine.object({
    name: vine.string(),
    phone: vine.string(),
    description: vine.string(),

    cep: vine.string(),
    country: vine.string(),
    state: vine.string(),
    city: vine.string(),
    neighborhood: vine.string(),
    street: vine.string(),
    number: vine.number(),
    complement: vine.string().optional(),
    images: vine
      .array(
        vine.file({
          size: '10mb',
          extnames: ['jpg', 'png', 'jpeg'],
        })
      )
      .optional(),

    companyId: vine
      .string()
      .uuid()
      .exists(async (db, value) => {
        const company = await db.from('companies').where('id', value).first()
        return company ? true : false
      }),
  })
)

export const editStoreValidation = vine.compile(
  vine.object({
    name: vine.string().optional(),
    phone: vine.string().optional(),
    description: vine.string().optional(),

    cep: vine.string().optional(),
    country: vine.string().optional(),
    state: vine.string().optional(),
    city: vine.string().optional(),
    neighborhood: vine.string().optional(),
    street: vine.string().optional(),
    number: vine.number().optional(),
    complement: vine.string().optional(),

    imagePath: vine
      .file({
        size: '10mb',
        extnames: ['jpg', 'png', 'jpeg'],
      })
      .optional()
      .requiredIfExists('attachments'),
    attachments: vine
      .object({
        type: vine.string(),
        name: vine.string(),
      })
      .optional(),

    companyId: vine
      .string()
      .uuid()
      .exists(async (db, value) => {
        const company = await db.from('companies').where('id', value).first()
        return company ? true : false
      }),

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

export const idStoreValidation = vine.compile(
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
