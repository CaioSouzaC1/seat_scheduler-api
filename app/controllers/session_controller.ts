import { UserService } from '#services/user_service'
import { authSesssionValidator } from '#validators/session_validation'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

@inject()
export default class SessionController {
  constructor(private userService: UserService) {}

  async login({ request, response, auth }: HttpContext) {
    const { email, password } = await authSesssionValidator.validate(request.body())

    const user = await this.userService.findByEmail({ email })

    if (!user) {
      response.abort('Invalid credentials')
    }

    const isPasswordValid = await hash.verify(user!.password, password)

    if (!isPasswordValid) {
      response.abort('Invalid credentials')
    }

    const token = await this.userService.createToken(user!)

    return response.send({ user, token })
  }

  async me({ auth, response }: HttpContext) {
    return response.send(auth.user)
  }
}
