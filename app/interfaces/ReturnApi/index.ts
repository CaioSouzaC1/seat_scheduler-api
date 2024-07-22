export interface IReturnApiDTO {
  response: any
  data?: any
  message: string
  code?: number
}

export interface IIndexRequest {
  page: number
  limit: number
  id?: string
}
