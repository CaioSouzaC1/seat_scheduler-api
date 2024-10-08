import vine from '@vinejs/vine'

export const storeCompanyValidation = vine.compile(
  vine.object({
    name: vine.string(),
    cnpj: vine.string(),

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
  })
)

export const editCompanyValidation = vine.compile(
  vine.object({
    name: vine.string().optional(),
    cnpj: vine.string().optional(),

    cep: vine.string().optional(),
    country: vine.string().optional(),
    state: vine.string().optional(),
    city: vine.string().optional(),
    neighborhood: vine.string().optional(),
    street: vine.string().optional(),
    number: vine.number().optional(),
    complement: vine.string().optional(),
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
          const company = await db.from('companies').where('id', value).first()
          return company ? true : false
        }),
    }),
  })
)

export const idCompanyValidation = vine.compile(
  vine.object({
    params: vine.object({
      id: vine
        .string()
        .uuid()
        .exists(async (db, value) => {
          const company = await db.from('companies').where('id', value).first()
          return company ? true : false
        }),
    }),
  })
)
