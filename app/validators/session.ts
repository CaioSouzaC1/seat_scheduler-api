import vine from '@vinejs/vine'

export const authSesssionValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string(),
  })
)
