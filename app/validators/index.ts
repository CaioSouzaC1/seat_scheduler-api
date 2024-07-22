import vine from '@vinejs/vine'

export const indexValidation = vine.compile(
  vine.object({
    params: vine.object({
      page: vine
        .string()
        .optional()
        .transform((value) => (value ? Number.parseInt(value) : 1)),
      limit: vine
        .string()
        .optional()
        .transform((value) => (value ? Number.parseInt(value) : 10)),
    }),
  })
)
