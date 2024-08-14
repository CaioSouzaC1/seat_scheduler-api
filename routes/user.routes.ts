import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
const UsersController = () => import('#controllers/users_controller')

router
  .group(() => {
    router.post('/', [UsersController, 'store'])
    router.post('/client', [UsersController, 'storeClient'])
    router.put('/', [UsersController, 'edit']).use(middleware.auth())
    router.delete('/', [UsersController, 'delete']).use(middleware.auth())
  })
  .prefix('users')
