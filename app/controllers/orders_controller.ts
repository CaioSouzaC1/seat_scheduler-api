import type { HttpContext } from '@adonisjs/core/http'
import ReturnApi from '../utils/return_api.js'
import { errors } from '@vinejs/vine'
import { orderIdValidator, orderStoreValidator } from '#validators/order'
import { inject } from '@adonisjs/core'
import { OrderService } from '#services/order_service'

@inject()
export default class OrdersController {
  constructor(private orderService: OrderService) { }

  async store({ request, response, auth }: HttpContext) {
    try {
      const { itemId, tableId } = await request.validateUsing(orderStoreValidator)

      await this.orderService.store({ itemId, tableId, userId: auth.user!.id })

      return ReturnApi.success({
        response,
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

  async index({ request, response, auth }: HttpContext) {
    try {
      const { limit, page } = request.qs()

      const orders = await this.orderService.index({ page, limit, id: auth.user!.id })

      return ReturnApi.success({
        response,
        data: orders,
        message: 'Lista de pedidos',
      })
    } catch (err) {
      return ReturnApi.error({
        response,
        message: 'Error ao listar o pedido',
        code: 400,
      })
    }
  }

  async show({ request, response }: HttpContext) {
    try {
      const {
        params: { id },
      } = await request.validateUsing(orderIdValidator)

      const order = await this.orderService.show({ orderId: id })

      return ReturnApi.success({
        response,
        data: order,
        message: 'Pedido encontrado com sucesso!',
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
        message: 'Error ao encontrar o pedido',
        code: 400,
      })
    }
  }

  async delete({ request, response }: HttpContext) {
    try {
      const {
        params: { id },
      } = await request.validateUsing(orderIdValidator)

      await this.orderService.delete({ orderId: id })

      return ReturnApi.success({
        response,
        message: 'Pedido deletado com sucesso!',
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
        message: 'Error ao deletar o pedido',
        code: 400,
      })
    }
  }
}
