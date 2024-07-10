const BookingsController = () => import('#controllers/bookings_controller')
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.get('/:id', [BookingsController, 'show'])
    router.put('/:id', [BookingsController, 'edit'])
    router.delete('/:id', [BookingsController, 'delete'])
    router.post('/', [BookingsController, 'store'])
  })
  .prefix('bookings')
  .middleware(middleware.auth())
