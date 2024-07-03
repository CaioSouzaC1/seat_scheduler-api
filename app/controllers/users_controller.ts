import { UserService } from '#services/user_service'
import { storeUserValidation } from '#validators/user_validation'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import ReturnApi from '../utils/return_api.js'
import { errors } from '@vinejs/vine'

@inject()
export default class UsersController {
  constructor(private userService: UserService) {}
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    try {
      const {
        email,
        name,
        phone,
        password,
        typeId,
        cep,
        city,
        state,
        number,
        street,
        country,
        complement,
        neighborhood,
      } = await request.validateUsing(storeUserValidation)

      const user = await this.userService.store({
        email,
        name,
        phone,
        password,
        typeId,
        cep,
        city,
        state,
        number,
        street,
        country,
        neighborhood,
        complement,
      })

      return ReturnApi.success({
        response,
        data: user,
        code: 201,
        message: 'Usuário criado com sucesso!',
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
      console.log(err)

      return ReturnApi.error({
        response,
        message: 'Error ao criar o Usuário',
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
