const NotificationsController = () => import('#controllers/notifications_controller')
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.get('/', [NotificationsController, 'index'])
  })
  .use(middleware.auth())
  .prefix('notifications')
