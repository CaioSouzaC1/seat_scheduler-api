import router from '@adonisjs/core/services/router'
const UsersController = () => import('#controllers/users_controller')

router
  .group(() => {
    router.post('/', [UsersController, 'store'])
  })
  .prefix('users')
