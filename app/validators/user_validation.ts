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
    complement: vine.string().nullable(),
    typeId: vine
      .string()
      .uuid()
      .exists(async (db, value) => {
        const type = await db.from('user_types').where('id', value).first()
        return type ? true : false
      }),
  })
)
