import { UserTypeService } from '#services/user_type_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import ReturnApi from '../utils/return_api.js'

@inject()
export default class UserTypesController {
  constructor(private userTypeService: UserTypeService) { }

  async index({ response }: HttpContext) {
    try {
      const types = await this.userTypeService.index()

      return ReturnApi.success({
        response,
        data: types,
        message: 'Lista dos tipos de usuários',
        code: 200,
      })
    } catch {
      return ReturnApi.error({
        response,
        message: 'Error ao listar dos tipos de usuários',
        code: 400,
      })
    }
  }
}
