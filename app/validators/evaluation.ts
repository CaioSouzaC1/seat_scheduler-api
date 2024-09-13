import vine from '@vinejs/vine'

export const storeEvaluationValidation = vine.compile(
  vine.object({
    note: vine.number().min(0).max(10),
    description: vine.string(),
    storeId: vine
      .string()
      .uuid()
      .exists(async (db, value) => {
        const store = await db.from('stores').where('id', value).first()
        return store ? true : false
      }),
  })
)

export const idEvaluationValidation = vine.compile(
  vine.object({
    params: vine.object({
      id: vine
        .string()
        .uuid()
        .exists(async (db, value) => {
          const evaluation = await db.from('evaluations').where('id', value).first()
          return evaluation ? true : false
        }),
    }),
  })
)

export const updateEvaluationValidation = vine.compile(
  vine.object({
    note: vine.number().min(0).max(10),
    description: vine.string(),
    params: vine.object({
      id: vine
        .string()
        .uuid()
        .exists(async (db, value) => {
          const evaluation = await db.from('evaluations').where('id', value).first()
          return evaluation ? true : false
        }),
    }),
  })
)
