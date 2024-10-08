/* eslint-disable @typescript-eslint/naming-convention */
export default interface IReturnApiDTO {
  response: any
  data?: any
  message: string
  code?: number
}

export interface IIndexRequest {
  page: number
  limit: number
}

export interface IIndexWithIdRequest extends IIndexRequest {
  id: string
}

export interface IIndexWithIdsRequest extends IIndexRequest {
  ids: string[]
}

export interface IIndexWithStatusRequest extends IIndexRequest {
  status: 'available' | 'scheduled' | 'busy'
}

export interface IIndexWithStatusAndIdsRequest
  extends IIndexWithIdsRequest,
    IIndexWithStatusRequest {}

export interface IIndexRequestWithUserId extends IIndexRequest {
  userId: string
}

export interface IIndexResquestWithSearchAndOrder extends IIndexRequest {
  search?: string
  orderBy?: string
}
