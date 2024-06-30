import { UserTypeService } from '#services/user_type_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class UserTypesController {
  constructor(private userTypeService: UserTypeService) { }

  async index({ response }: HttpContext) {
    const types = await this.userTypeService.index()

    return response.send(types)
  }
}

