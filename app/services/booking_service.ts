import Booking from '#models/booking'
import User from '#models/user'
import {
  IBookingId,
  IEditBookingRequest,
  IStoreBookingRequest,
} from '../interfaces/Requests/Booking/index.js'

export class BookingService {
  async store({ tableId, observation, reservedDate }: IStoreBookingRequest) {
    await Booking.create({ tableId, observation, reservedDate })
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

  async index(user: User) {
    const bookings = await Booking.query()
      .preload('table', (tableQuery) => {
        tableQuery.preload('store', (storeQuery) => {
          storeQuery.where('user_id', user.store.id)
        })
      })
      .paginate(1, 10)

    return bookings.serialize()
  }
}
