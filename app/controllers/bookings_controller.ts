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
  constructor(private bookingService: BookingService) { }

  async index({ response, auth }: HttpContext) {
    try {
      const bookings = await this.bookingService.index(auth.user!)

      return ReturnApi.success({
        response,
        data: bookings,
        message: 'Lista de agendamentos',
      })
    } catch (err){
      console.error(err)
      return ReturnApi.error({
        response,
        message: 'Error no agendamento',
        code: 400,
      })
    }

  }

  async store({ request, response }: HttpContext) {
    try {
      const { tableId, observation, reservedDate } =
        await request.validateUsing(storeBookingValidation)

      await this.bookingService.store({ tableId, observation, reservedDate })

      return ReturnApi.success({
        response,
        code: 201,
        message: 'Aguarde a resposta do agendamento',
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
        message: 'Error no agendamento',
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
        message: 'Atualização de agendamento',
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
        message: 'Error na atualização agendamento',
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
        message: 'Agendamento encontrado com sucesso!',
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
        message: 'Error ao encontrar o agendamento',
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
        message: 'Agendamento apagado com sucesso!',
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
        message: 'Error ao apagar o agendamento',
        code: 400,
      })
    }
  }
}
