export interface IStoreAddressRequest {
  cep: string
  country: string
  state: string
  city: string
  neighborhood: string
  street: string
  number: number
  complement: number
}

export interface IAddressIdRequest {
  addressId: string
}
