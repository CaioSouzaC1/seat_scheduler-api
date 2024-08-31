/* eslint-disable @typescript-eslint/naming-convention */
import { IEditAddressRequest, IStoreAddressRequest } from '../Address/index.js'

export interface IStoreUserRequest {
  email: string
  name: string
  phone: string
  password: string
  type?: string
  storeId?: string

  address: IStoreAddressRequest
}

export interface IEditUserRequest {
  userId: string
  email?: string
  name?: string
  phone?: string
  password?: string

  type?: string
  storeId?: string

  address: IEditAddressRequest
}

export interface IUserIdRequest {
  userId: string
}

export interface IFindByEmailUserRequest {
  email: string
}

export interface IStoreClientRequest {
  email: string
  name: string
  phone: string
  password: string
  address: IStoreAddressRequest
}
