export interface IStoreAddressRequest {
  cep: string
  country: string
  state: string
  city: string
  neighborhood: string
  street: string
  number: number
  complement: string | null
}

export interface IEditAddressRequest {
  addressId: string
  cep?: string
  country?: string
  state?: string
  city?: string
  neighborhood?: string
  street?: string
  number?: number
  complement?: string | null
}

export interface IAddressIdRequest {
  addressId: string
}
