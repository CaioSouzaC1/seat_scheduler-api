import { UserService } from '#services/user_service'
import { storeUserValidation, updateUserValidation } from '#validators/user'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import ReturnApi from '../utils/return_api.js'
import { errors } from '@vinejs/vine'

@inject()
export default class UsersController {
  constructor(private userService: UserService) { }

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
        cep,
        city,
        state,
        number,
        street,
        country,
        complement,
        neighborhood,
        type,
        storeId,
      } = await request.validateUsing(storeUserValidation)

      const user = await this.userService.store({
        storeId,
        type,
        email,
        name,
        phone,
        password,
        address: {
          cep,
          city,
          state,
          number,
          street,
          country,
          neighborhood,
          complement,
        },
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
      return ReturnApi.error({
        response,
        message: 'Error ao criar o Usuário',
        code: 400,
      })
    }
  }

  /**
   * Edit individual record
   */
  async edit({ response, request, auth }: HttpContext) {
    try {
      const {
        password,
        cep,
        city,
        name,
        email,
        phone,
        state,
        number,
        street,
        country,
        complement,
        neighborhood,
        type,
        storeId,
      } = await request.validateUsing(updateUserValidation)

      const user = auth.user

      await this.userService.update({
        userId: user!.id,
        password,
        name,
        email,
        phone,
        type,
        storeId,
        address: {
          addressId: user!.address.id,
          cep,
          city,
          state,
          number,
          street,
          country,
          complement,
          neighborhood,
        },
      })

      return ReturnApi.success({
        response,
        message: 'Usuário atualizado com sucesso!',
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
        message: 'Error ao atualizar o usuário',
        code: 400,
      })
    }
  }

  async delete({ response, auth }: HttpContext) {
    try {
      await this.userService.delete({ userId: auth.user!.id })

      return ReturnApi.success({
        response,
        message: 'Usuário deletado com sucesso!',
      })
    } catch {
      return ReturnApi.error({
        response,
        message: 'Error ao atualizar o usuário',
        code: 400,
      })
    }
  }
}
