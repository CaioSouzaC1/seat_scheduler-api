import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import type { Authenticators } from '@adonisjs/auth/types'
import { errors } from '@adonisjs/auth'
import ReturnApi from '../utils/return_api.js'

/**
 * Auth middleware is used authenticate HTTP requests and deny
 * access to unauthenticated users.
 */
export default class AuthMiddleware {
  /**
   * The URL to redirect to, when authentication fails
   */
  redirectTo = '/login'

  async handle(
    { auth, response }: HttpContext,
    next: NextFn,
    options: {
      guards?: (keyof Authenticators)[]
    } = {}
  ) {
    try {
      await auth.authenticateUsing(options.guards)
      await next()
    } catch (err) {
      if (err instanceof errors.E_UNAUTHORIZED_ACCESS) {
        ReturnApi.error({ response, code: 401, message: 'Não autorizado' })
      }
    }
  }
}
