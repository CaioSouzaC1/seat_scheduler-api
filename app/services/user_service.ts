import User from '#models/user'
import { inject } from '@adonisjs/core'
import { UserHasTypeService } from './user_has_type_service.js'
import { DateTime } from 'luxon'
import {
  IFindByEmailUserRequest,
  IUserIdRequest,
  IStoreUserRequest,
} from '../interfaces/Requests/User/index.js'
import Address from '#models/address'

@inject()
export class UserService {
  constructor(private userHasTypeService: UserHasTypeService) { }

  async store({
    name,
    password,
    phone,
    email,
    typeId,
    neighborhood,
    complement,
    country,
    street,
    number,
    state,
    city,
    cep,
  }: IStoreUserRequest): Promise<User> {
    const address = await Address.create({
      neighborhood,
      complement,
      country,
      street,
      number,
      state,
      city,
      cep,
    })

    const user = await address.related('user').create({
      email,
      name,
      phone,
      password,
    })

    await this.userHasTypeService.store({ typeId, userId: user.id })

    return user
  }

  async show({ userId }: IUserIdRequest): Promise<User | null> {
    const user = await User.find(userId)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail({ email }: IFindByEmailUserRequest): Promise<User | null> {
    const user = await User.findBy('email', email)

    if (!user) {
      return null
    }

    return user
  }

  async createToken(user: User) {
    const token = await User.accessTokens.create(user)

    return token.value!.release()
  }

  async countLogin(user: User) {
    const userOnDatabase = await User.find(user.id)

    userOnDatabase!.loginCount++

    await userOnDatabase!.save()
  }

  async lastLogin(user: User) {
    const userOnDatabase = await User.find(user.id)

    userOnDatabase!.lastLogin = DateTime.now().setLocale('pt-BR').toLocaleString()

    await userOnDatabase!.save()

    return userOnDatabase
  }
}
