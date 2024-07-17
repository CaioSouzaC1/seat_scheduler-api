import type { HttpContext } from '@adonisjs/core/http'
import ReturnApi from '../utils/return_api.js'
import { errors } from '@vinejs/vine'

export default class OrdersController {
  async store({ request, response }: HttpContext) {
    try {
      const {} = await request.validateUsing()

      return ReturnApi.success({
        response,
        data: null,
        code: 201,
        message: 'Pedido anotado com sucesso!',
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
        message: 'Error ao anotar o pedido',
        code: 400,
      })
    }
  }
}

