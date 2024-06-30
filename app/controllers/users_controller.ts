import { UserService } from '#services/user_service'
import { storeUserValidation } from '#validators/user_validation'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class UsersController {
  constructor(private userService: UserService) { }
  /**
   * Display a list of resource
   */
  async index({ }: HttpContext) { }

  /**
   * Display form to create a new record
   */
  async create({ }: HttpContext) { }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const { email, name, phone, password, typeId } = await storeUserValidation.validate(
      request.body()
    )
    const user = await this.userService.store({ email, name, phone, password, typeId })

    return response.status(201).send(user)
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) { }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) { }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) { }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) { }
}
