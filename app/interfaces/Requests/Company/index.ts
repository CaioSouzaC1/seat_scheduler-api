import { MultipartFile } from '@adonisjs/core/bodyparser'
import { IEditAddressRequest, IStoreAddressRequest } from '../Address/index.js'

export interface IStoreCompanyRequest {
  name: string
  cnpj: string
  images?: MultipartFile[]

  userId: string

  address: IStoreAddressRequest
}

export interface IEditCompanyRequest {
  companyId: string
  userId: string
  name?: string
  cnpj?: string

  images?: MultipartFile[]

  address: IEditAddressRequest
}

export interface ICompanyIdRequest {
  companyId: string
  userId: string
}
