export interface IStoreInBulkTableRequest {
  numberOfTables: number
  numberOfChairs: number
  observation: string
  status: string
  storeId: string
}

export interface IStoreTableRequest {
  number: number
  numberOfChairs: number
  observation: string
  status: string
  storeId: string
}

export interface IEditTableRequest {
  tableId: string
  number?: number
  numberOfChairs?: number
  observation?: string
  status?: string
}

export interface ITableIdRequest {
  tableId: string
}
