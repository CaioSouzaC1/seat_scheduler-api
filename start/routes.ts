/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const UserTypesController = () => import('#controllers/user_types_controller')
const UsersController = () => import('#controllers/users_controller')
const SessionController = () => import('#controllers/session_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    router.get('/', [UserTypesController, 'index'])
  })
  .prefix('user-types')

router
  .group(() => {
    router.post('/', [UsersController, 'store'])
  })
  .prefix('users')

router.get('/me', [SessionController, 'me']).use(middleware.auth())

router
  .group(() => {
    router.post('/', [SessionController, 'login'])
  })
  .prefix('login')
