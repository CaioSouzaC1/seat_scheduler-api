import { middleware } from '#start/kernel'
import { HttpContext } from '@adonisjs/core/http'
import router from '@adonisjs/core/services/router'

const SessionController = () => import('#controllers/session_controller')

router.get('/me', [SessionController, 'me']).use(middleware.auth())

router.post('/login', [SessionController, 'login'])

router
  .get('/checktoken', ({ response }: HttpContext) => {
    return response.status(200)
  })
  .use(middleware.auth())
