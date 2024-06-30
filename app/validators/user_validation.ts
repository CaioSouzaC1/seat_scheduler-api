import vine from '@vinejs/vine'

export const storeUserValidation = vine.compile(
  vine.object({
    name: vine.string(),
    email: vine.string().email(),
    password: vine.string(),
    phone: vine.string(),
    typeId: vine
      .string()
      .uuid()
      .exists(async (db, value) => {
        const type = await db.from('user_types').where('id', value).first()
        return type ? true : false
      }),
  })
)
