const StoresController = () => import('#controllers/stores_controller')
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.get('/', [StoresController, 'index'])
    router.post('/', [StoresController, 'store'])
    router.put('/:id', [StoresController, 'edit'])
    router.delete('/:id', [StoresController, 'delete'])
  })
  .prefix('stores')
  .middleware(middleware.auth())
