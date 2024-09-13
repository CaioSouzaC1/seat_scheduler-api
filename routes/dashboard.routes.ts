const DashboardController = () => import('#controllers/dashboard_controller')
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.get('/cards', [DashboardController, 'cards'])
    router.get('/recent-bookings', [DashboardController, 'recentBookings'])
  })
  .prefix('dashboard')
  .middleware(middleware.auth())
