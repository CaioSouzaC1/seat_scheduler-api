import Booking from '#models/booking'
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
}
