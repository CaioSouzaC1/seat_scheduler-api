import Booking from '#models/booking'
import {
  IBookingId,
  IEditBookingRequest,
  IStoreBookingRequest,
} from '../interfaces/Requests/Booking/index.js'
import { IIndexRequest } from '../interfaces/ReturnApi/index.js'
import ws from './ws.js'

export class BookingService {
  async store({ tableId, observation, reservedDate, storeId, userId }: IStoreBookingRequest) {
    await Booking.create({ tableId, observation, reservedDate, storeId, userId })

    ws.io?.emit(`notify.${storeId}`, { message: `Reservation for ${reservedDate}` })
  }

  async update({ observation, reservedDate, bookingId }: IEditBookingRequest) {
    const booking = await Booking.find(bookingId)

    booking!.reservedDate = reservedDate ?? booking!.reservedDate
    booking!.observation = observation ?? booking!.observation

    await booking?.save()
  }

  async show({ bookingId }: IBookingId) {
    const booking = await Booking.query()
      .preload('store')
      .preload('user')
      .preload('table')
      .where('id', bookingId)
      .first()

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

  async index({ page, limit, ids: storeIds }: IIndexRequest) {
    const bookings = await Booking.query()
      .preload('store')
      .preload('user')
      .preload('table')
      .whereHas('store', (storeQuery) => {
        storeQuery.whereIn('id', storeIds!)
      })
      .paginate(page, limit)

    return bookings.toJSON()
  }
}
