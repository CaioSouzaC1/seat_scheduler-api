import { MultipartFile } from '@adonisjs/core/bodyparser'

export interface IStoreStoreRequest {
  name: string
  phone: string
  description: string
  companyId: string
}

export interface IEditStoreRequest {
  storeId: string
  companyId: string
  name?: string
  phone?: string
  description?: string
}

export interface IStoreIdRequest {
  storeId: string
}

export interface IStoreStoreAttachementRequest {
  name: string
  type: string
  imagePath: MultipartFile
}
