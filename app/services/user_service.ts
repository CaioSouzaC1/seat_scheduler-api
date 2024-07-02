import User from '#models/user'
import { inject } from '@adonisjs/core'
import { UserHasTypeService } from './user_has_type_service.js'
import { DateTime } from 'luxon'
import {
  FindByEmailUserRequest,
  ShowUserRequest,
  StoreUserRequest,
} from '../interfaces/Requests/User/index.js'

@inject()
export class UserService {
  constructor(private userHasTypeService: UserHasTypeService) {}

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

  async countLogin(user: User) {
    const userOnDatabase = await User.find(user.id)

    userOnDatabase!.loginCount += 1

    await user.save()
  }

  async lastLogin(user: User) {
    const userOnDatabase = await User.find(user.id)

    userOnDatabase!.lastLogin = DateTime.now().toLocaleString({ timeZone: 'BRT' })

    await userOnDatabase!.save()
  }
}
