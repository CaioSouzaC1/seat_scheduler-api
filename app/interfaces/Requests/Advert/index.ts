/* eslint-disable @typescript-eslint/naming-convention */
import { MultipartFile } from '@adonisjs/core/bodyparser'

export interface IStoreAdvertRequest {
  companyId: string
  storeId: string
  name: string
  type: string
  images: MultipartFile[]
}

export interface IUpdateAdvertRequest {
  advertId: string
  name?: string
  type?: string
  images?: MultipartFile[]
}

export interface IAdvertRequestId {
  advertId: string
}
