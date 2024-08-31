export interface ITableStatus {
  status?: 'available' | 'scheduled' | 'busy'
}

export interface IStoreInBulkTableRequest extends ITableStatus {
  numberOfTables: number
  numberOfChairs: number
  observation?: string
  storeId: string
}

export interface IStoreTableRequest extends ITableStatus {
  number: number
  numberOfChairs: number
  observation?: string
  status?: string
  storeId: string
}

export interface IEditTableRequest extends ITableStatus {
  tableId: string
  number?: number
  numberOfChairs?: number
  observation?: string
}

export interface ITableIdRequest {
  tableId: string
}

export interface IDeleteInBulkRequest {
  storeId: string
  tables: string[]
}
