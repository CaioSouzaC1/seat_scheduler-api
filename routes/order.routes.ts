const OrdersController = () => import('#controllers/orders_controller')
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.post('/', [OrdersController, 'store'])
    router.get('/', [OrdersController, 'index'])
    router.get('/:id', [OrdersController, 'show'])
    router.delete('/:id', [OrdersController, 'delete'])
    // router.put('/', [OrdersController, 'edit'])
  })
  .use(middleware.auth())
  .prefix('orders')
