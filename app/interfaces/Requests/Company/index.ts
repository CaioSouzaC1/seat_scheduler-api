import { MultipartFile } from '@adonisjs/core/bodyparser'

export interface IStoreCompanyRequest {
  name: string
  cnpj: string
  cep: string
  country: string
  state: string
  city: string
  neighborhood: string
  street: string
  number: number
  complement: string | null
  images?: MultipartFile[]

  userId: string
}

export interface IEditCompanyRequest {
  companyId: string
  userId: string
  name?: string
  cnpj?: string
  cep?: string
  country?: string
  state?: string
  city?: string
  neighborhood?: string
  street?: string
  number?: number
  complement?: string | null
  images?: MultipartFile[]
}

export interface ICompanyId {
  companyId: string
  userId: string
}
