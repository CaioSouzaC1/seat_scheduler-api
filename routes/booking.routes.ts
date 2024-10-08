const BookingsController = () => import('#controllers/bookings_controller')
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.patch('/:id/accept', [BookingsController, 'accepted'])
    router.patch('/:id/reject', [BookingsController, 'rejected'])

    router.get('/:id', [BookingsController, 'show'])
    router.put('/:id', [BookingsController, 'edit'])
    router.delete('/:id', [BookingsController, 'delete'])

    router.post('/', [BookingsController, 'store'])
    router.get('/', [BookingsController, 'index'])
  })
  .prefix('books')
  .middleware(middleware.auth())
