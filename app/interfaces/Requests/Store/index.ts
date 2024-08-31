/* eslint-disable @typescript-eslint/naming-convention */
import { MultipartFile } from '@adonisjs/core/bodyparser'

export interface IStoreStoreRequest {
  addressId: string
  name: string
  phone: string
  description: string
  companyId: string
  images?: MultipartFile[]
}

export interface IEditStoreRequest {
  storeId: string
  companyId: string
  name?: string
  phone?: string
  description?: string
  images?: MultipartFile[]
}

export interface IStoreIdRequest {
  storeId: string
}

export interface IStoreStoreAttachementRequest {
  name: string
  type: string
  imagePath: MultipartFile
}
