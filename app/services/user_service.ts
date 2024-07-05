import User from '#models/user'
import { inject } from '@adonisjs/core'
import { UserHasTypeService } from './user_has_type_service.js'
import { DateTime, Settings } from 'luxon'
import {
  IFindByEmailUserRequest,
  IUserIdRequest,
  IStoreUserRequest,
  IEditUserRequest,
} from '../interfaces/Requests/User/index.js'
import Address from '#models/address'
import { AddressService } from './address_service.js'

@inject()
export class UserService {
  constructor(
    private userHasTypeService: UserHasTypeService,
    private addressService: AddressService
  ) { }

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
    const addressId = await this.addressService.store({
      neighborhood,
      complement,
      country,
      street,
      number,
      state,
      city,
      cep,
    })

    const user = await User.create({
      email,
      name,
      phone,
      password,
      addressId,
    })

    await this.userHasTypeService.store({ typeId, userId: user.id })

    return user
  }

  async update({
    userId,
    email,
    name,
    typeId,
    password,
    phone,
    cep,
    city,
    state,
    number,
    street,
    country,
    complement,
    neighborhood,
  }: IEditUserRequest) {
    const user = await User.find(userId)

    if (!user) return null

    await this.addressService.update({
      addressId: user!.addressId,
      cep,
      city,
      state,
      number,
      street,
      country,
      complement,
      neighborhood,
    })

    user.email = email ?? user.email
    user.name = name ?? user.name
    user.phone = phone ?? user.phone
    user.password = password ?? user.password

    if (typeId) await this.userHasTypeService.update({ typeId, userId: user.id })

    await user.save()
  }

  async delete({ userId }: IUserIdRequest) {
    const user = await User.find(userId)

    if (!user) return null

    await user.delete()
  }

  async findByEmail({ email }: IFindByEmailUserRequest): Promise<User | null> {
    const user = await User.findBy('email', email)

    if (!user) {
      return null
    }

    return user
  }

  async findById({ userId }: IUserIdRequest): Promise<User | null> {
    const user = await User.find(userId)

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
    Settings.defaultZone = 'America/Sao_Paulo'

    const userOnDatabase = await User.find(user.id)

    userOnDatabase!.lastLogin = DateTime.now().setLocale('pt-BR').toLocaleString()

    await userOnDatabase!.save()

    return userOnDatabase
  }
}
