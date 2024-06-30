import UserHasType from '#models/user_has_type'

type StoreUserHasTypeRequest = {
  userId: string
  typeId: string
}

export class UserHasTypeService {
  async store({ typeId, userId }: StoreUserHasTypeRequest): Promise<void> {
    UserHasType.create({ typeId, userId })
  }
}
