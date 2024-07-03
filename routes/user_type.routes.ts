const UserTypesController = () => import('#controllers/user_types_controller')
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.get('/', [UserTypesController, 'index'])
  })
  .prefix('user-types')
