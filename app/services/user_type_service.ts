import UserType from '#models/user_type'

export class UserTypeService {
  async index() {
    return UserType.all()
  }
}
