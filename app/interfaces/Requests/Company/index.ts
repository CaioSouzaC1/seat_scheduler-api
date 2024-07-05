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
}

export interface ICompanyId {
  companyId: string
  userId: string
}
