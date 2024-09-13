import type { HttpContext } from '@adonisjs/core/http'

import { inject } from '@adonisjs/core'
import { DashboardService } from '#services/dashboard_service'
import ReturnApi from '../utils/return_api.js'

@inject()
export default class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  async cards({ response, auth }: HttpContext) {
    try {
      const cards = await this.dashboardService.cards({
        userId: auth.user!.id!,
        loginCount: auth.user!.loginCount!,
      })

      return ReturnApi.success({
        response,
        data: cards,
        message: 'Dados dos cards',
      })
    } catch (err) {
      console.log(err)
      return ReturnApi.error({
        response,
        message: 'Error ao listar as anúncios',
        code: 400,
      })
    }
  }

  async recentBookings({ response, auth }: HttpContext) {
    try {
      const recentBookings = await this.dashboardService.recentBookings({
        userId: auth.user!.id!,
      })

      return ReturnApi.success({
        response,
        data: recentBookings,
        message: 'Dados dos cards',
      })
    } catch (err) {
      console.log(err)
      return ReturnApi.error({
        response,
        message: 'Error ao listar as anúncios',
        code: 400,
      })
    }
  }
}
