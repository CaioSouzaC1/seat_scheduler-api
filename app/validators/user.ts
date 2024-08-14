import vine from '@vinejs/vine'

export const storeUserValidation = vine.compile(
  vine.object({
    name: vine.string(),
    email: vine.string().email(),
    password: vine.string(),
    phone: vine.string(),

    cep: vine.string(),
    country: vine.string(),
    state: vine.string(),
    city: vine.string(),
    neighborhood: vine.string(),
    street: vine.string(),
    number: vine.number(),
    complement: vine.string().optional(),

    type: vine.string().optional(),

    storeId: vine
      .string()
      .exists(async (db, value) => {
        const store = await db.from('stores').where('id', value).first()
        return store ? true : false
      })
      .optional(),
  })
)

export const updateUserValidation = vine.compile(
  vine.object({
    name: vine.string().optional(),
    email: vine.string().email().optional(),
    password: vine.string().optional(),
    phone: vine.string().optional(),

    cep: vine.string().optional(),
    country: vine.string().optional(),
    state: vine.string().optional(),
    city: vine.string().optional(),
    neighborhood: vine.string().optional(),
    street: vine.string().optional(),
    number: vine.number().optional(),
    complement: vine.string().optional(),

    type: vine.string().optional(),

    storeId: vine
      .string()
      .exists(async (db, value) => {
        const store = await db.from('stores').where('id', value).first()
        return store ? true : false
      })
      .optional(),
  })
)

export const storeClientValidation = vine.compile(
  vine.object({
    name: vine.string(),
    email: vine.string().email(),
    password: vine.string(),
    phone: vine.string(),
    cep: vine.string(),
    country: vine.string(),
    state: vine.string(),
    city: vine.string(),
    neighborhood: vine.string(),
    street: vine.string(),
    number: vine.number(),
    complement: vine.string().optional(),
  })
)
