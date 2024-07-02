import { UserService } from '#services/user_service'
import { storeUserValidation } from '#validators/user_validation'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import ReturnApi from '../utils/return_api.js'

@inject()
export default class UsersController {
  constructor(private userService: UserService) {}
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {}

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const { email, name, phone, password, typeId } = await storeUserValidation.validate(
      request.body()
    )

    try {
      const user = await this.userService.store({ email, name, phone, password, typeId })

      return ReturnApi.success({
        response,
        data: user,
        code: 201,
        message: 'Usuário criado com sucesso!',
      })
    } catch {
      return ReturnApi.error({
        response,
        message: 'Error ao Usuário criar!',
        code: 400,
      })
    }
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
