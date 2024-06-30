import User from '#models/user'
import { inject } from '@adonisjs/core'
import { UserHasTypeService } from './user_has_type_service.js'

type StoreUserRequest = {
  email: string
  name: string
  phone: string
  password: string
  typeId: string
}

type ShowUserRequest = {
  userId: string
}

type FindByEmailUserRequest = {
  email: string
}

@inject()
export class UserService {
  constructor(private userHasTypeService: UserHasTypeService) { }

  async store({ name, password, phone, email, typeId }: StoreUserRequest): Promise<User> {
    const user = await User.create({
      email,
      name,
      phone,
      password,
    })

    await this.userHasTypeService.store({ typeId, userId: user.id })

    return user
  }

  async show({ userId }: ShowUserRequest): Promise<User | null> {
    const user = await User.find(userId)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail({ email }: FindByEmailUserRequest): Promise<User | null> {
    const user = await User.findBy('email', email)

    if (!user) {
      return null
    }

    return user
  }

  async createToken(user: User) {
    const token = await User.accessTokens.create(user)

    return token
  }
}
