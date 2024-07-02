import UserType from '#models/user_type'

export class UserTypeService {
  async index() {
    const types = await UserType.all()

    const typesJson = types.map((type) => type.serialize())

    return typesJson
  }
}
