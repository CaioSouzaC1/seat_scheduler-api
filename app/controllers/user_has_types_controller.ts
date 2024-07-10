import type { HttpContext } from '@adonisjs/core/http'

export default class UserHasTypesController {
  async store({ request, response }: HttpContext) {
    return response.send()
  }
}
