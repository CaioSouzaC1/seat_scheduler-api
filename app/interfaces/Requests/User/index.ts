export interface StoreUserRequest {
  email: string
  name: string
  phone: string
  password: string
  typeId: string
}

export interface ShowUserRequest {
  userId: string
}

export interface FindByEmailUserRequest {
  email: string
}
