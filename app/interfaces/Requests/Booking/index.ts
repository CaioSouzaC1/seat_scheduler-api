/* eslint-disable @typescript-eslint/naming-convention */
export interface IStoreBookingRequest {
  tableId: string
  userId: string
  observation?: string
  reservedDate: string
  storeId: string
}

export interface IEditBookingRequest {
  bookingId: string
  storeId?: string
  observation?: string
  reservedDate?: string
}

export interface IBookingId {
  bookingId: string
}
