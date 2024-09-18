/* eslint-disable @typescript-eslint/naming-convention */
export interface IStoreMenuItemRequest {
  name: string
  description?: string
  price: number
  storeId: string
}

export interface IIndexMenuItemRequest {
  page?: number
  limit?: number
  storeId: string
  search?: string
}
