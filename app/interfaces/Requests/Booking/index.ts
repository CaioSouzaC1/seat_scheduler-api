export interface IStoreBookingRequest {
  tableId: string
  observation?: string
  reservedDate: string
}

export interface IEditBookingRequest {
  bookingId: string
  observation?: string
  reservedDate?: string
}

export interface IBookingId {
  bookingId: string
}
