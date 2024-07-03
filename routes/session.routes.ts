import { middleware } from '#start/kernel'
import { Route } from '@adonisjs/core/http'
import router from '@adonisjs/core/services/router'

const SessionController = () => import('#controllers/session_controller')

router.get('/me', [SessionController, 'me']).use(middleware.auth())

router.post('/login', [SessionController, 'login'])
