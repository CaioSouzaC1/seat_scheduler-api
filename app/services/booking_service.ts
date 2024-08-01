import Booking from '#models/booking'
import Table from '#models/table'
import {
  IBookingId,
  IEditBookingRequest,
  IStoreBookingRequest,
} from '../interfaces/Requests/Booking/index.js'
import { IIndexRequest } from '../interfaces/ReturnApi/index.js'
import ws from './ws.js'

export class BookingService {
  async store({ tableId, observation, reservedDate, storeId }: IStoreBookingRequest) {
    await Booking.create({ tableId, observation, reservedDate, storeId })

    ws.io?.emit(`notify.${storeId}`, { message: `Reservation for ${reservedDate}` })
  }

  async update({ observation, reservedDate, bookingId }: IEditBookingRequest) {
    const booking = await Booking.find(bookingId)

    booking!.reservedDate = reservedDate ?? booking!.reservedDate
    booking!.observation = observation ?? booking!.observation

    await booking?.save()
  }

  async show({ bookingId }: IBookingId) {
    const booking = await Booking.find(bookingId)

    return booking
  }

  async delete({ bookingId }: IBookingId) {
    const booking = await Booking.find(bookingId)

    await booking?.delete()
  }

  async accepted({ bookingId }: IBookingId) {
    const booking = await Booking.find(bookingId)

    booking!.status = 'reservado'

    await booking?.save()
  }

  async reject({ bookingId }: IBookingId) {
    const booking = await Booking.find(bookingId)

    booking!.status = 'disponível'

    await booking?.save()
  }

  async index({ page, limit, id: userId }: IIndexRequest) {
    const bookies = await Booking.query()
      .preload('table', (tableQuery) => {
        tableQuery.whereHas('store', (storeQuery) => {
          storeQuery.preload('user', (userQuery) => {
            userQuery.where('id', userId!)
          })
        })
      })
      .paginate(page, limit)

    return bookies.toJSON()
  }
}
