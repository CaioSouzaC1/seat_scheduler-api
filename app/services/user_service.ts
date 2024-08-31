import User from '#models/user'
import { inject } from '@adonisjs/core'
import { DateTime, Settings } from 'luxon'
import {
  IFindByEmailUserRequest,
  IUserIdRequest,
  IStoreUserRequest,
  IEditUserRequest,
  IStoreClientRequest,
} from '../interfaces/Requests/User/index.js'
import { AddressService } from './address_service.js'
import UserType from '#models/user_type'

@inject()
export class UserService {
  constructor(private addressService: AddressService) { }

  async store({
    name,
    password,
    phone,
    email,
    address: { cep, city, state, number, street, country, complement, neighborhood },
    type,
    storeId,
  }: IStoreUserRequest): Promise<User> {
    const address = await this.addressService.store({
      cep,
      city,
      state,
      number,
      street,
      country,
      complement,
      neighborhood,
    })

    const user = await User.create({
      email,
      name,
      phone,
      password,
      addressId: address.id,
    })

    type = type ? type : 'operator'

    const typeId = await UserType.findBy('name', type)

    if (typeId) await user.related('type').attach([typeId.id])

    if (storeId) await user.related('store').attach([storeId])

    return user
  }

  async update({
    userId,
    email,
    name,
    password,
    phone,
    address: { cep, city, state, number, street, country, complement, neighborhood },
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

    await user.save()
  }

  async delete({ userId }: IUserIdRequest) {
    const user = await User.find(userId)

    if (!user) return null

    await user.delete()
  }

  async findByEmail({ email }: IFindByEmailUserRequest): Promise<User | null> {
    const user = await User.query()
      .preload('company')
      .preload('address')
      .preload('type')
      .preload('store')
      .preload('evaluation')
      .where('email', email)
      .first()

    if (!user) {
      return null
    }

    return user
  }

  async findById({ userId }: IUserIdRequest): Promise<User | null> {
    const user = await User.query()
      .preload('company')
      .preload('address')
      .preload('type')
      .preload('store')
      .preload('evaluation')
      .where('id', userId)
      .first()

    return user
  }

  async createToken(user: User) {
    const token = await User.accessTokens.create(user)

    return token.value!.release()
  }

  async countLogin(user: User) {
    const userOnDatabase = await User.query()
      .preload('company')
      .preload('address')
      .preload('type')
      .preload('store')
      .preload('evaluation')
      .where('id', user.id)
      .first()

    userOnDatabase!.loginCount++

    await userOnDatabase?.save()
  }

  async lastLogin(user: User) {
    Settings.defaultZone = 'America/Sao_Paulo'

    const userOnDatabase = await User.query()
      .preload('company')
      .preload('address')
      .preload('type')
      .preload('store')
      .where('id', user.id)
      .first()

    userOnDatabase!.lastLogin = DateTime.now().setLocale('pt-BR').toLocaleString()

    await userOnDatabase?.save()

    return userOnDatabase
  }

  async storeClient({
    name,
    password,
    phone,
    email,
    address: { cep, city, state, number, street, country, complement, neighborhood },
  }: IStoreClientRequest): Promise<User> {
    const address = await this.addressService.store({
      cep,
      city,
      state,
      number,
      street,
      country,
      complement,
      neighborhood,
    })

    const user = await User.create({
      email,
      name,
      phone,
      password,
    })

    await user.related('address').associate(address)

    return user
  }
}
