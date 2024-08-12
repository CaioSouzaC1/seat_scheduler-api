import { NotificationService } from '#services/notification_service'
import type { HttpContext } from '@adonisjs/core/http'
import ReturnApi from '../utils/return_api.js'
import { inject } from '@adonisjs/core'

@inject()
export default class NotificationsController {
  constructor(private notificationService: NotificationService) {}

  async index({ request, response, auth }: HttpContext) {
    try {
      const { limit, page } = request.qs()

      const notification = await this.notificationService.index({ page, limit, id: auth.user!.id })

      return ReturnApi.success({
        response,
        data: notification,
        message: 'Lista de notificações',
      })
    } catch (err) {
      return ReturnApi.error({
        response,
        message: 'Error ao listar as notificações',
        code: 400,
      })
    }
  }
}
