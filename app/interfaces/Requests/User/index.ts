export interface IStoreUserRequest {
  email: string
  name: string
  phone: string
  password: string
  typeId: string
  cep: string
  country: string
  state: string
  city: string
  neighborhood: string
  street: string
  number: number
  complement: string | null
}

export interface IUserIdRequest {
  userId: string
}

export interface IFindByEmailUserRequest {
  email: string
}
