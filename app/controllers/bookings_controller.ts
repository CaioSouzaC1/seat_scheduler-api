import type { HttpContext } from '@adonisjs/core/http'
import ReturnApi from '../utils/return_api.js'
import { errors } from '@vinejs/vine'
import {
  editBookingValidation,
  idBookingRequest,
  storeBookingValidation,
} from '#validators/booking'
import { inject } from '@adonisjs/core'
import { BookingService } from '#services/booking_service'

@inject()
export default class BookingsController {
  constructor(private bookingService: BookingService) {}

  async index({ request, response, auth }: HttpContext) {
    try {
      const { limit, page } = request.qs()

      const bookings = await this.bookingService.index({ page, limit, id: auth.user!.id })

      return ReturnApi.success({
        response,
        data: bookings,
        message: 'Lista de reservas',
      })
    } catch (err) {
      console.log(err)
      return ReturnApi.error({
        response,
        message: 'Error no reserva',
        code: 400,
      })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const { tableId, observation, reservedDate, storeId } =
        await request.validateUsing(storeBookingValidation)

      await this.bookingService.store({ tableId, observation, reservedDate, storeId })

      return ReturnApi.success({
        response,
        code: 201,
        message: 'Aguarde a resposta da reserva',
      })
    } catch (err) {
      if (err instanceof errors.E_VALIDATION_ERROR) {
        return ReturnApi.error({
          response,
          message: err.message,
          data: err.messages,
          code: 400,
        })
      }
      return ReturnApi.error({
        response,
        message: 'Error no reserva',
        code: 400,
      })
    }
  }

  async edit({ request, response }: HttpContext) {
    try {
      const {
        observation,
        reservedDate,
        params: { id },
      } = await request.validateUsing(editBookingValidation)

      await this.bookingService.update({ bookingId: id, reservedDate, observation })

      return ReturnApi.success({
        response,
        message: 'Atualização de reserva',
      })
    } catch (err) {
      if (err instanceof errors.E_VALIDATION_ERROR) {
        return ReturnApi.error({
          response,
          message: err.message,
          data: err.messages,
          code: 400,
        })
      }
      return ReturnApi.error({
        response,
        message: 'Error na atualização reserva',
        code: 400,
      })
    }
  }

  async show({ request, response }: HttpContext) {
    try {
      const {
        params: { id },
      } = await request.validateUsing(idBookingRequest)

      const booking = await this.bookingService.show({ bookingId: id })

      return ReturnApi.success({
        response,
        data: booking,
        message: 'Reserva encontrada com sucesso!',
      })
    } catch (err) {
      if (err instanceof errors.E_VALIDATION_ERROR) {
        return ReturnApi.error({
          response,
          message: err.message,
          data: err.messages,
          code: 400,
        })
      }
      return ReturnApi.error({
        response,
        message: 'Error ao encontrar o reserva',
        code: 400,
      })
    }
  }

  async delete({ request, response }: HttpContext) {
    try {
      const {
        params: { id },
      } = await request.validateUsing(idBookingRequest)

      await this.bookingService.delete({ bookingId: id })

      return ReturnApi.success({
        response,
        message: 'Reserva apagada com sucesso!',
      })
    } catch (err) {
      if (err instanceof errors.E_VALIDATION_ERROR) {
        return ReturnApi.error({
          response,
          message: err.message,
          data: err.messages,
          code: 400,
        })
      }
      return ReturnApi.error({
        response,
        message: 'Error ao apagar o reserva',
        code: 400,
      })
    }
  }

  async accepted({ request, response }: HttpContext) {
    try {
      const {
        params: { id },
      } = await request.validateUsing(idBookingRequest)

      await this.bookingService.accepted({ bookingId: id })

      return ReturnApi.success({
        response,
        message: 'Reserva aceita com sucesso!',
      })
    } catch (err) {
      if (err instanceof errors.E_VALIDATION_ERROR) {
        return ReturnApi.error({
          response,
          message: err.message,
          data: err.messages,
          code: 400,
        })
      }
      return ReturnApi.error({
        response,
        message: 'Error ao aceitar a reserva',
        code: 400,
      })
    }
  }

  async rejected({ request, response }: HttpContext) {
    try {
      const {
        params: { id },
      } = await request.validateUsing(idBookingRequest)

      await this.bookingService.reject({ bookingId: id })

      return ReturnApi.success({
        response,
        message: 'Reserva negada com sucesso!',
      })
    } catch (err) {
      if (err instanceof errors.E_VALIDATION_ERROR) {
        return ReturnApi.error({
          response,
          message: err.message,
          data: err.messages,
          code: 400,
        })
      }
      return ReturnApi.error({
        response,
        message: 'Error ao nagada o reserva',
        code: 400,
      })
    }
  }
}
