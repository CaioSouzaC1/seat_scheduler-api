import { UserService } from '#services/user_service'
import { authSesssionValidator } from '#validators/session'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import ReturnApi from '../utils/return_api.js'

@inject()
export default class SessionController {
  constructor(private userService: UserService) { }

  async login({ request, response }: HttpContext) {
    const { email, password } = await authSesssionValidator.validate(request.body())

    let user = await this.userService.findByEmail({ email })

    if (!user) return ReturnApi.error({ response, message: 'Usuário não encontrado!', code: 400 })

    const isPasswordValid = await hash.verify(user!.password, password)

    if (!isPasswordValid)
      return ReturnApi.error({ response, message: 'Usuário ou senha inválidos!', code: 400 })

    await this.userService.countLogin(user!)

    user = await this.userService.lastLogin(user!)

    const token = await this.userService.createToken(user!)

    return ReturnApi.success({
      response,
      data: { user, token },
      message: 'Usuário logado com sucesso!',
      code: 200,
    })
  }

  async me({ auth, response }: HttpContext) {
    return ReturnApi.success({ response, data: auth.user, message: 'Seus dados!' })
  }
}
