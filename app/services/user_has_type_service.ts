import UserHasType from '#models/user_has_type'

type StoreUserHasTypeRequest = {
  userId: string
  typeId: string
}

export class UserHasTypeService {
  async store({ typeId, userId }: StoreUserHasTypeRequest): Promise<void> {
    await UserHasType.create({ typeId, userId })
  }

  async update({ typeId, userId }: StoreUserHasTypeRequest): Promise<void> {
    const type = await UserHasType.findBy({ userId: userId, type_id: typeId })

    if (!type) return

    type.typeId = typeId

    await type.save()
  }
}
